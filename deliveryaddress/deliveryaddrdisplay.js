exports.deliveryaddrdisplay= function (event,redisDatasAddrData){
	
		var modules = require('../module.js');
		
        var data = JSON.stringify({
			"getDlvryAddr" : {                   
					"mrktCd": modules.api.mrktCd,
					"acctNr": redisDatasAddrData.userId,
					"userId": redisDatasAddrData.userId,
					"version": "1",
					"devKey":modules.api.devKey,					
					"token": redisDatasAddrData.token,
					"langCd": modules.api.langCd
				}
				});		
				
			
		var options = modules.api.prepareWSDetails("DISPLAYDELIVADDRESS",data);
		var http = require('http');
		var req = http.request(options, function(res) {
		var msg = '';
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
		msg += chunk;
		});
		res.on('end', function() {	
		
		var lastdelivAddrArray =JSON.parse(msg).LastOrdAddrResp.addrDetl;
		
		var defaultAddrLocTyp=redisDatasAddrData.defaultAddrLocTyp ;
		
		var delivAddrDisplay = [];
		var lastAddrLocTyp='';
		var lastdelivAddr = '';	
		var defaultdelivAddr = redisDatasAddrData.defaultdelivAddr;				
	   if(typeof lastdelivAddrArray!=='undefined'&& lastdelivAddrArray[0].hasOwnProperty("addrLine1Txt")){
		
		lastdelivAddr = lastdelivAddrArray[0].addrLine1Txt;
		lastAddrLocTyp = lastdelivAddrArray[0].addrLocTyp;
		
		client.hmset(event.sender.id, {
			'lastdelivAddr':lastdelivAddr,
			'lastAddrLocTyp':lastAddrLocTyp						
											
		}); 				
			if(defaultdelivAddr === lastdelivAddr){
				delivAddrDisplay.push({
					"title": modules.getMessages.getMessages(delivaddress.title),
					"subtitle": defaultdelivAddr,
					"buttons": [{
					"title": "Select",
					"type": "postback",
					"payload": "DEFAULTADDR"
					
								}]
								});		
			
			}else{					
			delivAddrDisplay.push({
					"title": modules.getMessages.getMessages(delivaddress.title),
					"subtitle": defaultdelivAddr,
					"buttons": [{
					"title": "Select",
					"type": "postback",
					"payload": "DEFAULTADDR"
					
								}]
								},
								{
					"title": modules.getMessages.getMessages(lastdelivaddress.title),
					"subtitle": lastdelivAddr,
					"buttons": [{
					"title": "Select",
					"type": "postback",
					"payload": "LASTDELIVADDR"
					
								}]
								});						
			}
		}else{ 
			
			delivAddrDisplay.push({
					"title": modules.getMessages.getMessages(delivaddress.title),
					"subtitle": defaultdelivAddr,
					"buttons": [{
					"title": "Select",
					"type": "postback",
					"payload": "DEFAULTADDR"
					
								}]
								});
			
		}
		if(delivAddrDisplay.length>=2){
			message = {
				"attachment": {
					"type": "template",
					"payload": {
					"template_type": "list",
					"top_element_style": "compact",
					"elements":delivAddrDisplay
							   }
							  }
					};
			sendMessage(event.sender.id, message);				
		}
		else{
		
		message = {
			"attachment": {
				"type": "template",
				"payload": {
				"template_type": "generic",
				"elements":delivAddrDisplay
						   }
						  }
				};
		sendMessage(event.sender.id, message);
		
		}
		
		}); 
		
		});
		
		req.write(data);
		req.end();					
}
