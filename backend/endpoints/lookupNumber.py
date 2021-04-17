from . import Utils

'''
Looks for all rules associated with a given number
'''

def endpoint ( event, context):
    body = Utils.get_body( event )
    resp = handler ( body )
    return Utils.respond( 'Success', resp )


def handler( body ):
    items = Utils.lookup_number( body['phone'] )
    return items['Items']


    