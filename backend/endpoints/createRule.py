from . import utils

'''
Registers a rule on the table for a specific phone number
'''

def endpoint ( event, context):
    body = utils.get_body( event )
    resp = handler ( body )
    return utils.respond( 'Success', resp )


def handler( body ):
    utils.insert_rule( body['number'], body['time'], body['payload'] )
    return {}