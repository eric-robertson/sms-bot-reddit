from . import Utils

'''
Removes a given rule from the system
'''

def endpoint ( event, context):
    body = Utils.get_body( event )
    resp = handler ( body )
    return Utils.respond( 'Success', resp )


def handler( body ):
    Utils.remove_rule( body['id'] )


    