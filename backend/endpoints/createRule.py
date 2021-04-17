from . import Utils

'''
Registers a rule on the table for a specific phone number
'''

def endpoint ( event, context):
    body = Utils.get_body( event )
    resp = handler ( body )
    return Utils.respond( 'Success', resp )


def handler( body ):
    Utils.insert_rule( body['number'], body['time'], body['payload'] )
    return {}