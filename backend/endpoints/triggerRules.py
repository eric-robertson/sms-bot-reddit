from . import utils

'''
Trigger all the rules since last epoch
'''


def endpoint ( event, context):
    body = utils.get_body( event )
    resp = handler ( body )
    return utils.respond( 'Success', resp )


def handler( body, timeslice = 15 * 60 ):

    current_time = utils.time_since_midnight()
    lower_time = current_time - timeslice

    items = utils.lookup_trigger( (lower_time, current_time) )
    cached_responces = {}

    for item in items['Items']:
        rule = item['rule']

        if rule['type'] == 'raw':
            utils.send_message( rule['msg'], item['phone-number'])

        if rule['type'] == 'reddit':
            if not rule['subreddit'] in cached_responces:
                _url = utils.pull_top_url(rule['subreddit'])
                cached_responces[rule['subreddit']] = _url
            url = cached_responces[rule['subreddit']]
            print(url)
            utils.send_message( f"hot from {rule['subreddit']}", item['phone-number'], media=url)

    return