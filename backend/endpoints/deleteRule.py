from . import utils

'''
Removes a given rule from the system
'''

def endpoint ( event, context):
    body = utils.get_body( event )
    resp = handler ( body )
    return utils.respond( 'Success', resp )


def handler( body ):
    utils.remove_rule( body['id'] )


    