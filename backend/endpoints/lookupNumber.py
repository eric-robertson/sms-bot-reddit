from . import utils

'''
Looks for all rules associated with a given number
'''

def endpoint ( event, context):
    body = utils.get_body( event )
    resp = handler ( body )
    return utils.respond( 'Success', resp )


def handler( body ):
    items = utils.lookup_number( body['phone'] )['Items']
    for i in items:
        i['trigger-time'] = int( i['trigger-time'] )
    return items


    