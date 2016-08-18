app.get('/specRepo', function (req,res){
	//Grabs all Li elements and links, li for structure, a@href for linking to the actual sites
	
	x('https://github.com/enaqx/awesome-react/blob/master/README.md', '.entry-content', [{
	//x('https://github.com/sorrycc/awesome-javascript/blob/master/README.md', '.entry-content', [{
		items: x('ul', [['li']]),
		links: x('ul', [['a@href']])
	}])(function(err, obj) {
		if (err) throw err;
		//all encompassed in finjson, which organizes these
		var finjson= {
			'name': 'OneRepo',
			'children':[]
		}
		var origEntries=[];
		var totalNum= obj[0].items[0].length
		// This is position in obj array where the entries actually start, gets incremented when we advance one
		var cliff=6;
		//var cliff= 13;
		var subArrtrigger = false;
		for(var i=0; i<totalNum; i++){
			var entry = {}
			// if the line has a new line character in it, in other words, it has subcategories. This is why this is so complex.
			if(obj[0].items[0][i].indexOf('\n') > -1){
				//cut off the trailing /n character
				var newVar=obj[0].items[0][i].split('\n').slice(0, -1)
				//console.log(newVar)

				entry.name=newVar[0]
				entry.uniq=newVar[0].replace(/[\. ,:-]+/g, "");
				

				origEntries.push({'label':newVar[0], 'value':newVar[0].replace(/[\. ,:-]+/g, "")})

				entry.children = [];
				// This is so we can nest correctly
				var countLevel =0;
				var negCount = 0;

				// A TAX ON ALL YE HEATHENS
				// I can't explain why this is needed, but it takes care of an off by 1 error so great
				cliff--
				
				//Make sure we do not get the first, top level category since we already did that in lines above
				for(var j=1; j< newVar.length; j++){
					var smEntry ={
						children: []
					}
					//know where to put the entries in which buckets
					var keyLength= entry.children.length

					if(newVar[j].length > 0){

						smEntry.name=newVar[j].split(' - ')[0]
						smEntry.uniq=newVar[j].replace(/[\. ,:-]+/g, "");
						totalNum--

						// If the next item in array has a line break, we know this is time to create a new category
						if(obj[0].items[0][i+1].indexOf('\n') > -1){

							entry.children.push(smEntry)
							countLevel++
							obj[0].items[0].splice(i+1, 1)
							obj[0].items.splice(i+1, 1)
							obj[0].links[0].splice(i+1, 1)
							obj[0].links.splice(i+1, 1)
							//console.log(newVar[j])
							//in case the number of li elements does not match the number of sections, this provides a failsafe
							cliff= Number(12 +(j-negCount) - (countLevel))
							//console.log(cliff)
							//console.log(obj[0].items[12 +(j-negCount) - (countLevel)])
						}
						else {
							//every individual entry
							//console.log(newVar[j])
							//console.log(obj[0].items[cliff])
							var keyArray=obj[0].items[cliff]
							
							for(var k=0; k< keyArray.length; k++){
								var lilArray={
									children: []
								}
								// Fix, TO DO: Some bullets go one level deeper. Be able to handle this.
								if(keyArray[k].indexOf('\n') > -1){
									console.log('this should not be here')
									//Issue is right here
									console.log(obj[0].items[cliff])
									console.log(obj[0].items[cliff+1])
									var subBul= keyArray[k].split('\n').slice(0, -1)
									for(var m=1; m< subBul.length; m++){
										if(subBul[m].length){
											var smallestArray={}
											var moreSplit=subBul[m].split(' - ')
											smallestArray.name=moreSplit[0]
											smallestArray.desc=moreSplit[1]
											smallestArray.uniq=subBul[m].replace(/[\. ,:-]+/g, "")
											lilArray.children.push(smallestArray)
										}
									}
									trigger=true
								}

								
								var nameSplit=keyArray[k].split(' - ')
								lilArray.name=nameSplit[0]
								lilArray.desc=nameSplit[1]
								lilArray.uniq=keyArray[k].replace(/[\. ,:-]+/g, "")
								smEntry.children.push(lilArray)
							}
							
							if(countLevel==0)
								entry.children.push(smEntry)
							else
								entry.children[keyLength-1].children.push(smEntry)
							obj[0].items[0].splice(i+1, 1)
							obj[0].links[0].splice(i+1, 1)

							cliff++
						}
					}
					else
						negCount++
				}
				//console.log(entry)
				//When we have a sublist, need to knock out next in array
				obj[0].items.splice(1, 1)
				//console.log('CLIFF NUM FIN ' + cliff)
			}
			else{
				entry.name=obj[0].items[0][i]
				entry.uniq=obj[0].items[0][i].replace(/[\. ,:-]+/g, "");
				origEntries.push({'label':obj[0].items[0][i], 'value':obj[0].items[0][i].replace(/[\. ,:-]+/g, "")})
			}
			finjson['children'].push(entry)
			
		}
		//console.log(finjson)
		res.send([obj, finjson])
	})
		
})