import pyrebase
import requests
import json
import datetime
import random

config = {  "apiKey": "AIzaSyAEldpNbEqFav1YEvA5VEKRcCXqg4-FGOo",  "authDomain": "project-798833822419.firebaseapp.com",  "databaseURL": "https://trycatch-c3eef.firebaseio.com/",  "storageBucket": "project-798833822419.appspot.com", "serviceAccount": "auth.json" }
firebase = pyrebase.initialize_app(config)
db = firebase.database()

apis = ["787f0096a7a9ec30f0235facf20d4fc2", "ae71f475536bcf48f3005651c176bf85", "1002b91d3dae2119bdc05a013f8014e0", "5f4abd2e599348ef96f9630b65c6ce4f"]
api_index = 0

def fillUpMembers():
    headers = {"X-API-Key": "YiPPPsDRHE4xNOJuPuuGDO9wJBFEYzEQOKqC12Rw"}
    rsenate = requests.get("https://api.propublica.org/congress/v1/115/senate/members.json", headers=headers)
    rhouse = requests.get("https://api.propublica.org/congress/v1/115/house/members.json", headers=headers)
    
    senate_members = rsenate.json()["results"][0]["members"]
    for member in senate_members:
	member["first_last"] = str(member["first_name"].encode('utf-8').lower()) + " " + str(member["last_name"].encode('utf-8').lower())
        db.child("reps").push(member)

    house_members = rhouse.json()["results"][0]["members"]
    for member in house_members:
	member["first_last"] = str(member["first_name"].encode('utf-8').lower()) + " " + str(member["last_name"].encode('utf-8').lower())
        db.child("reps").push(member)




#Used to get all of the bills that a candidate has introduced
def fillUpBills():
    headers= {"X-API-Key": "YiPPPsDRHE4xNOJuPuuGDO9wJBFEYzEQOKqC12Rw"}

    example_bills = '[{"senate_passage": null, "sponsor_name": "Luke Messer", "number": "H.R.1624", "house_passage": "2017-10-02", "sponsor_id": "M001189", "sponsor_party": "R", "summary": "Municipal Finance Support Act of 2017 This bill amends the Federal Deposit Insurance Act to require certain municipal obligations to be treated as level 2A liquid assets if they are investment grade, liquid, and readily marketable. Under current law, only certain securities issued or guaranteed by a U.S. government-sponsored enterprise, a sovereign entity, or a multilateral development bank may be treated as level 2A liquid assets (which are considered to be high-quality assets).", "cosponsors_by_party": {"R": 7, "D": 12}, "vetoed": null, "title": "To require the appropriate Federal banking agencies to treat certain municipal obligations as level 2A liquid assets, and for other purposes.", "summary_short": "Municipal Finance Support Act of 2017 This bill amends the Federal Deposit Insurance Act to require certain municipal obligations to be treated as level 2A liquid assets if they are investment grade, liquid, and readily marketable. Under current law, only certain securities issued or guaranteed by a U.S. government-sponsored enterprise, a sovereign entity, or a multilateral development bank may be treated as level 2A liquid assets (which are considered to be high-quality assets).", "sponsor_state": "IN", "congressdotgov_url": "https://www.congress.gov/bill/115th-congress/house-bill/1624", "congress": "115", "bill_type": "hr", "gpo_pdf_uri": null, "primary_subject": "Finance and Financial Sector", "active": true, "committees": "Senate Banking, Housing, and Urban Affairs Committee", "enacted": null, "bill_uri": "https://api.propublica.org/congress/v1/115/bills/hr1624.json", "latest_major_action": "Received in the Senate and Read twice and referred to the Committee on Banking, Housing, and Urban Affairs.", "sponsor_title": "Rep.", "sponsor_uri": "https://api.propublica.org/congress/v1/members/M001189.json", "short_title": "Municipal Finance Support Act of 2017", "introduced_date": "2017-03-20", "latest_major_action_date": "2017-10-04", "govtrack_url": "https://www.govtrack.us/congress/bills/115/hr1624", "cosponsors": 19, "bill_id": "hr1624-115"}]'




    inventory = db.child("reps").get()
    for x in inventory.each():
        r = requests.get("https://api.propublica.org/congress/v1/members/" + str(x.val()["id"]) + "/bills/introduced.json", headers=headers) 

        list_of_bills = ""

        if r.json()["status"] == "500":
            list_of_bills = json.loads(example_bills)
        else:
            list_of_bills = r.json()["results"][0]["bills"]

        for bills in list_of_bills:
            bills["vote_up"] = random.randint(0,100) 
            bills["vote_down"] = random.randint(0,100)
            db.child("reps").child(x.key()).child("bills").push(bills)

	print "Finished bills for " + str(x.key())

def fixUpCRPID():
    inventory = db.child("reps").get()

    change = {"S001141":"N00003062", "M001182":"N00031412", "Z000018":"N00035616", "B000287":"N00009774", "P000602":"N00030744", "P000591": "N00026160"}
    for x in inventory.each():
        if x.val()["id"] in ["S001141", "M001182", "Z000018", "B000287", "P000602","P000591"]:
            db.child("reps").child(x.key()).child("crp_id").set(change[str(x.val()["id"])])
            


def fillUpDonations():
    no_donations = []
    inventory = db.child("reps").get()
    for x in inventory.each():
	apikey = apis[api_index]
        params = {"apikey": apikey, "cycle":"2016", "cid":str(x.val()["crp_id"]),"method":"candIndustry", "output":"json" }
        r = requests.get("https://www.opensecrets.org/api/", params=params)
	if r.text == "call limit has been reached":
		api_index+=1
		print "\n\n\nHey, we are replacing this API. Index now is " + str(api_index)
        try:
            industries = r.json()["response"]["industries"]["industry"]
            for industry in industries:
                attr = industry["@attributes"]
                db.child("reps").child(x.key()).child("contrib").push(attr)
        except:
            no_donations.append(x.key())
            attr = {'total': '370500', 'industry_code': 'F09', 'industry_name': 'Insurance', 'pacs': '222500', 'indivs': '148000'}
            db.child("reps").child(x.key()).child("contrib").push(attr)
	print "Donation for " + str(x.key())
    print "no donations" + str(no_donations)

def fixUpDonations():
    array_broken = []
    for x in array_broken:
        attr= {'total': '370500', 'industry_code': 'F09', 'industry_name': 'Insurance', 'pacs': '222500', 'indivs': '148000'}
        db.child("reps").child(x).child("contrib").remove()
        db.child("reps").child(x).child("contrib").push(attr)


def readWar():
	war = open("war.txt", "r")
	lines = war.readlines()
	inventory = db.child("reps").get()
	for_bool = True
	for x in inventory.each():
		print str(x.key())
		if db.child("reps").child(x.key()).child("bills") is None:
			print "We caught this one. Fuck em\n\n\n\n\n\n\n\n\n" + str(x.key())
			db.child("reps").child(x.key()).remove()
			for_bool = False
		if for_bool:
			for y in db.child("reps").child(x.key()).child("bills").get().each():
				#print db.child("reps").child(x).child("bills").child(y).val()
				comments = []
				for k in range(random.randint(1,3)):
					new_comment = {}
					new_comment["timestamp"] = str(datetime.datetime.now())
					new_comment["username"] = "Bot"
					new_comment["emailname"] = "bot,bot"
					line = lines[random.randint(0, len(lines)-1)]
					new_comment["sentiment"] = str(random.choice(["neg", "neutral", "pos"]))
					new_comment["text"] = str(line).rstrip()
					new_comment["creating"] = "false"
					children = [] 
					for i in range(random.randint(1,2)):		
						new_dict = {}
						new_dict["username"] = "Bot"
						new_dict["emailname"] = "bot,bot"
						new_dict["comment"] = lines[random.randint(0,len(lines)-1)].rstrip()
						new_dict["timestamp"] = str(datetime.datetime.now())
						#print json.dumps(new_dict)
						children.append(new_dict)
					new_comment["childarray"] = children
					comments.append(new_comment)
				json_comments = json.dumps(comments)
				db.child("reps").child(x.key()).child("bills").child(y.key()).child("comments").push(json.loads(json_comments))
		for_bool = True
		print "Comments for " + str(x.key())




#fillUpMembers()
#print "Filled up the members!"

#fillUpBills()
#print "Filled up the bills!"

#fixUpCRPID()
#print "Filled up the crp_id!"

#fillUpDonations()
#print "Filled up the donations!"

#4a) fixUpDonations() this was only used to fix up the last problem, this is now fixed.

readWar()

#This is getting the contributions using the opensecrets API. Finish it later
#From the old API there were some with no crp_id
#change = {"id": "S001141", "crp_id":"N00003062"}, {"id": "M001182", "crp_id": "N00031412"}, {"id":"Z000018", "crp_id": "N00035616"}, {"id": "B000287", "crp_id": "N00009774"}, {"id": "P000602", "crp_id":"N00030744"}, {"id": "P000591", "crp_id": "N00026160"}
#def array_of_children_with_crp_id():
#    array_of_contr = []
#    reps = db.child("reps").get()
#    for x in reps.each():
#       array_of_contr.append({"crp_id":str(x.val()["crp_id"]), "key": x.key()})
#
#
#    return array_of_contr   
#
#array = array_of_children_with_crp_id()
#array_failed = []
#for i in array:
#    print i
#    params = {"apikey": "92129e156b53913b5f4449eecf95d2fe", "cycle":"2016", "cid":str(i["crp_id"]),"method":"candContrib", "output":"json" }
#    r = requests.get("https://www.opensecrets.org/api/", params=params)
#    try:
#        print r.json()
#    except:
#        print str(r.url)
#        array_failed.append(str(r.url()))
#
#print array_failed
