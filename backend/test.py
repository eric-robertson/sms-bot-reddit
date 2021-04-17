from endpoints import createRule
from endpoints import lookupNumber
from endpoints import deleteRule
from endpoints import triggerRules
from endpoints import Utils

'''
createRule.handler( 
    Utils.package_body(
        {
            "number" : 9085680224,
            "time" : 123123,
            "payload" : {
                "type" : "raw"
            }
        }
    ),'')


createRule.handler(
    {
        "number" : 9085680224,
        "time" : 1,
        "payload" : {
            "type" : "reddit",
            "subreddit" : 'me_irl'
        }
    }
)'''

print( triggerRules.handler( 0, timeslice=999999 ) )