function scheduleHtmlParser(html) {
    let timesss =[
        {
            "section" : 1,
            "startTime" : "08:30",
            "endTime" : "09:15",
        },
        {
            "section" : 2,
            "startTime" : "09:20",
            "endTime" : "10:05",
        },
        {
            "section" : 3,
            "startTime" : "11:30",
            "endTime" : "11:15",
        },
        {
            "section" : 4,
            "startTime" : "11:20",
            "endTime" : "12:05",
        },
        {
            "section" : 5,
            "startTime" : "14:30",
            "endTime" : "15:15",
        },
        {
            "section" : 6,
            "startTime" : "15:20",
            "endTime" : "16:05",
        },
        {
            "section" : 7,
            "startTime" : "16:10",
            "endTime" : "16:55",
        },
        {
            "section" : 8,
            "startTime" : "17:00",
            "endTime" : "17:45",
        },
        {
            "section" : 9,
            "startTime" : "19:00",
            "endTime" : "19:45",
        },
        {
            "section" : 10,
            "startTime" : "19:50",
            "endTime" : "20:35",
        }
    ]
    console.info(html)
    let result = [];
    //上课时间
    const regexT = /<td width="13.5%" valign="top" align="center" height="50">(.*?)<\/td>/gm;
    let timeFlag = 0;
    let mmm = { courseInfos: []}
    var dangianxingqi = 1
    while ((t = regexT.exec(html)) !== null) {
        if (dangianxingqi>7){
            dangianxingqi=1
        }
        if(t[1]==="&nbsp;"){
            dangianxingqi++

        }else{

            var q = t[1].split('<br>')
            console.info(q)

            let re = {sections: [], weeks: []}
            re.day = Number.parseInt(dangianxingqi)
            re.name = q[0]
            re.teacher = q[2]
            re.position = q[3]
            var qName = q[1].split("节");
            console.info(qName)
            if (qName[0]==="(12"){
                re.sections.push(timesss[0])
                re.sections.push(timesss[1])
            }else if (qName[0]==="(34"){
                re.sections.push(timesss[2])
                re.sections.push(timesss[3])
            }else if (qName[0]==="(56"){
                re.sections.push(timesss[4])
                re.sections.push(timesss[5])
            }else if (qName[0]==="(78"){
                re.sections.push(timesss[6])
                re.sections.push(timesss[7])
            }else if (qName[0]==="(910"){
                re.sections.push(timesss[8])
                re.sections.push(timesss[19])
            }

            if (qName[1]==="(单))"){
                var bName =  q[4].split("-")
                console.info(bName)
                for (let i = bName[0];i<=bName[1];i++){
                    if (i%2!==0){
                        re.weeks.push(Number.parseInt(i))
                    }
                }
            }else if (qName[1]==="(双))"){
                var bName =  q[4].split("-")
                console.info(bName)
                for (let i = bName[0];i<=bName[1];i++){
                    if (i%2===0){
                        re.weeks.push(Number.parseInt(i))
                    }
                }
            }else{
                var bName =  q[4].split("-")
                console.info(bName)
                for (let i = bName[0];i<=bName[1];i++){
                    re.weeks.push(Number.parseInt(i))
                }
            }

            dangianxingqi++

            result.push(re)

        }

    }

    console.info(result)
    return {courseInfos: result}
}
