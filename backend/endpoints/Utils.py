import json, uuid, os
import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime
from signalwire.rest import Client as signalwire_client
import requests

# setup

with open(f'{os.path.dirname(__file__)}/keys.json') as f: keys = json.load(f)

tableName = 'sms-ruletable-2'
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(tableName)
client = signalwire_client(
    keys['project-id'], 
    keys['auth-token'], 
    signalwire_space_url = 'smsbot.signalwire.com'
)


# Time

def time_since_midnight():
    now = datetime.now()
    midnight = now.replace(hour=0, minute=0, second=0, microsecond=0)
    return int((now - midnight).total_seconds())

# Lambda 

def get_body ( event ):
    return json.loads(event['body'])

def package_body ( payload ):
    return { "body" : json.dumps(payload) }

def respond ( msg, data = {}, status = 200 ):
    return {
        "statusCode": status,
        "headers": {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        "body": json.dumps({
            "message" : msg,
            "data" : data
        }),
    }

# Dyanmodb

def insert_rule ( phone, time, rule ):
    table.put_item(
        Item={
            "id" : uuid.uuid4().hex,
            "phone-number" : phone,
            "trigger-time" : time,
            "rule" : rule,
        }
    )

def remove_rule ( id ):
    return table.delete_item(
        Key={ 'id' : id }
    )

def lookup_number ( phone ):
    return table.scan(
        **{
            'FilterExpression' : Key('phone-number').eq( phone )
        }
    )

def lookup_trigger ( range ):
    return table.scan(
        **{
            'FilterExpression' : Key('trigger-time').between(*range)
        }
    )

# Signal Wire

def send_message ( msg, number, media=False):
    print(f"Triggering with msg: {msg} to {number} and media: {media}")
    if media:
        client.messages.create(
            from_=keys['phone-number'],
            body=msg,
            to=f'+1{number}',
            media_url=media
        )
    else:
        '''client.messages.create(
            from_=keys['phone-number'],
            body=msg,
            to=f'+1{number}'
        )'''
        pass


# Reddit

def pull_top_url ( reddit ):
    items = requests.get(
        f'https://www.reddit.com/r/{reddit}/hot/.json?count=5&raw_json=1',
        headers={'User-Agent' : 'sms-thingy-123123'}
    )
    data = items.json()
    children = data['data']['children']
    for child in children:
        if 'preview' in child['data']:
            return child['data']['preview']['images'][0]['source']['url']

    print('failed for ', reddit)
    return ''