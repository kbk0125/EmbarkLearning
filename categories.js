module.exports = {
    "webdesign":{
        "default":{
            "title": "Web Design- All",
            "short": "Web Design",
            "summary": "Stumped on how to design a beautiful site? This is for you.",
            "reqs": [" HTML/CSS Fundamentals "],
            "next":[
                ["Interactive Websites: "," Javascript "],
                ["Make It Easy To Use: "," User Experience "]
            ]
        },
        'subcat':{
            "color":{
                "title": "Web Design- Color",
                "short": "Color",
                "summary": "Make sure all the elements compliment each other",
                "img": "/img/catImg/colorwheel.png",
                "challenge1": {
                    "short": "Analyze the work of an expert",
                    "full": "Head over to a website that you think has awesome design. Use Dev Tools to take note of every color they use on their landing page. Why did they use those specific button colors? Also, can you pick out one color that you think they should improve?"
                },
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Readable Text: "," Typography "],
                    ["Relationship Between Elements: "," Space "]
                ]
            },
            "typography":{
                "title": "Web Design- Typography",
                "short": "Typography",
                "summary": "Choose a font that is easily readable",
                "img": "/img/catImg/typography.png",
                "challenge1": {
                    "short": "Discover an awesome font",
                    "full": "Head over to <a href='https://www.google.com/fonts' target='_blank'>Google Fonts</a> and try 5 different fonts in a current project you are working on. Make sure to play with the font-weight as well. Which header font is best? Which body font is best?"
                },
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Distinguish Elements: "," Color "],
                    ["Relationship Between Elements: "," Space "]
                ]
            },
            "space":{
                "title": "Web Design- Space",
                "short": "Space",
                "summary": "Indicate which elements are related to each other",
                "img": "/img/catImg/whitespace.png",
                "challenge1": {
                    "short": "Analyze the work of an expert",
                    "full": "Head over to your favorite website with a lot of written content. Use Dev Tools to take note of their padding, margins, border and text-alignment in their content sections. Change these from within Dev Tools, and see how it affects scanability of the page."
                },
                "reqs": [" HTML/CSS Fundamentals "],
                "next":[
                    ["Distinguish Elements: "," Color "],
                    ["Readable Text: "," Typography "],
                    ["Arrange Page's Content: "," Information Hierarchy "]
                ]
            },
            "information":{
                "title": "Web Design- Information Hierarchy",
                "short": "Hierarchy",
                "summary": "Arrange content for maximum readability",
                "img": "/img/catImg/hierarchy.png",
                "challenge1": {
                    "short": "Analyze the work of an expert",
                    "full": "Head over to a website that you think has awesome design. Use Dev Tools to take note of their line-height, margins, font color and font-size on their content sections. Try these out in your site."
                },
                "reqs": [" Color "," Typography "," Space "],
                "next":[
                    ["Build A Mockup: "," Wireframing "]
                ]
            },
            "wireframing":{
                "title": "Web Design- Wireframing",
                "short": "Wireframing",
                "summary": "Build a mockup for testing or team members",
                "img": "/img/catImg/wireframe.png",
                "challenge1": {
                    "short": "Build and test your own wireframes",
                    "full": "Use a program like Balsamiq or InVision to design your own wireframes for 1 flow (set of consecutive pages). Then test your wireframe with three friends and see if they can complete specific actions."
                },
                "reqs": [" Color "," Typography "," Space ", " Information Hierarchy "],
                "next":[
                    ["Make It Easy To Use: "," User Experience "]
                ]
            }
        }
    },
    "userexperience":{
        "default":{
            "title": "User Experience- All",
            "short": "User Experience",
            "summary": "Make the lives of your users as easy as possible",
            "reqs": [" HTML/CSS Fundamentals ", " Javascript Fundamentals ", " jQuery "],
            "next":[
                ["Store Data For Your Site: "," Databases "]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "User Experience- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn the basics of designing a logical user experience",
                "img": "/img/catImg/uxlogo.png",
                "challenge1": {
                    "short": "Test out an expert's work",
                    "full": "Sign up for a site that you might be interested in. As soon as you hit the page, take note of every action you take. Why did you take that particular action? What little things did the site do to facilitate that action? What was unclear?"
                },
                "reqs": [" HTML/CSS Fundamentals ", " Javascript Fundamentals ", " jQuery "],
                "next":[
                    ["Show Your Site's Value: "," Landing Page "]
                ]
            },
            "research":{
                "title": "User Experience- Research",
                "short": "User Research",
                "summary": " Understand your user's needs before you build",
                "img": "/img/catImg/userresearch.png",
                "challenge1": {
                    "short": "Put your site to the test",
                    "full": "Approach three friends or colleagues, and ask them to spend 5 minutes testing your site. Ask them to complete a certain task, then let them take their own path to get there. Ask them to explain their actions out loud!"
                },
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Show Your Site's Value: "," Landing Page "],
                    ["Give Perfect Instructions: "," Microcopy "]
                ]
            },
            "landingpage":{
                "title": "User Experience- Landing Page",
                "short": "Landing Page",
                "summary": "Make sure that users understand the value on the first page",
                "img": "/img/catImg/landingpage.png",
                "challenge1": {
                    "short": "Test a landing page for free",
                    "full": "Use the <a href='http://peek.usertesting.com/' target='_blank'>Peek tool</a> to test your site or another site with 3 different users. See what the average person does/doesn't like! Make sure the site tested will be understandable to the average American."
                },
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Get Users Hooked: "," Onboarding "]
                ]
            },
            "onboarding":{
                "title": "User Experience- Onboarding",
                "short": "Onboarding",
                "summary": "Keep your visitors interested while they learn more",
                "img": "/img/catImg/onboarding.png",
                "challenge1": {
                    "short": "Learn from the best in the business",
                    "full": "Use the <a href='https://www.useronboard.com/' target='_blank'>UserOnboard tool</a> to review the teardowns from 3 sites you are interested in. Then choose a site you enjoy, and re-design its onboarding sequence from beginning to end."
                },
                "reqs": [" User Experience Fundamentals ", " Landing Page "],
                "next":[
                    ["Give Perfect Instructions: "," Microcopy "]
                ]
            },
            "microcopy":{
                "title": "User Experience- Microcopy",
                "short": "Microcopy",
                "summary": "Make sure your instructions are perfectly clear",
                "img": "/img/catImg/microcopy.png",
                "challenge1": {
                    "short": "Do your own microcopy test",
                    "full": "Choose one interface from either your site or another site. Create two different versions- one with the existing copy, and one with varied copy in 3-5 places. Test it with three friends or colleagues, and see which one they find to be more clear."
                },
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Help Users Take Action: "," Conversion "]
                ]
            },
            "conversion":{
                "title": "User Experience- Conversion",
                "short": "Conversion",
                "summary": "Help users move through your site and find its value",
                "img": "/img/catImg/conversion.png",
                "challenge1": {
                    "short": "Use a free conversion testing tool",
                    "full": "Use <a href='https://www.optimizely.com/' target='_blank'>Optimizely</a> to test one site that you have online. Pick one conversion metric, and measure its success with Optimizely over 2 weeks."
                },
                "reqs": [" User Experience Fundamentals "],
                "next":[
                    ["Coming Soon!"]
                ]
            }
        }
    },
    "html":{
        "default":{
            "title": "HTML/CSS - All",
            "short": "HTML/CSS",
            "summary": "The building blocks of a website",
            "reqs": ["Just be an internet user!"],
            "next":[
                ["Interactive Websites: ", "JavaScript"]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "HTML/CSS- Fundamentals",
                "short": "Fundamentals",
                "summary": "Take the first steps towards learning web development",
                "img": "/img/catImg/html.png",
                "challenge1": {
                    "short": "Build one page and view in your browser",
                    "full": "Figure out how to link HTML/CSS/JS files and view them in your browser. Then build the front page to your personal website and view it in your browser."
                },
                "reqs": ["Just be an internet user!"],
                "next":[
                    ["Your First Project: ", "Build A Full Site"]
                ]
            },
            "fullsite":{
                "title": "HTML/CSS- Build First Site",
                "short": "Build A Site",
                "summary": "Build a basic website and start your portfolio",
                "img": "/img/catImg/buildasite.png",
                "challenge1": {
                    "short": "Build an entire simple site",
                    "full": "Check out <a href='https://medium.com/@kevink/8-crazy-ideas-for-building-a-web-site-a25b3f69c517#.iwdbbsomq' target='_blank'>this blog post </a> and build one of the projects listed."
                },
                "reqs": ["HTML/CSS Fundamentals"],
                "next":[
                    ["Fit All Screen Sizes: ", "Responsive Web Design"]
                ]
            },
            "responsive":{
                "title": "HTML/CSS- Responsive Design",
                "short": "Responsive",
                "summary": "Make your website beautiful on all screen sizes",
                "img": "/img/catImg/css.png",
                "challenge1": {
                    "short": "Make one of your sites responsive",
                    "full": "Pick a site that you have previously built, and make it responsive down to mobile devices. If it does not have enough content, add some to create more of a challenge."
                },
                "reqs": ["Build A Full Site"],
                "next":[
                    ["Interactive Websites: ", "Javascript"]
                ]
            }
        }
    },
    "javascript":{
        "default":{
            "title": "Javascript- All",
            "short": "JavaScript",
            "summary": "Add interactive elements and build real-time web apps",
            "reqs": ["HTML/CSS Fundamentals"],
            "next":[
                ["Store Data For Your Site: ", "Databases"],
                ["Fit All Screen Sizes: ", "Responsive Web Design"]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "Javascript- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn programming basics and then make your site more fun",
                "img": "/img/catImg/javascriptlogo.png",
                "challenge1": {
                    "short": "Test your JavaScript knowledge",
                    "full": "Take this <a href='https://github.com/sethvincent/javascripting' target='_blank'>basic programming test</a> to see if you truly understand JavaScript fundamentals! Note: you will need to install Node.js."
                },
                "reqs": ["HTML/CSS Fundamentals"],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Javascript For Back End: "," Node.js "],
                    ["Data Visualization: "," D3.js "]
                ]
            },
            "jquery":{
                "title": "Javascript- JQuery",
                "short": "jQuery",
                "summary": "Easily add interactive elements to your site",
                "img": "/img/catImg/jquerylogo.png",
                "challenge1": {
                    "short": "Build an entire simple site",
                    "full": "Check out <a href='https://medium.com/@kevink/8-crazy-ideas-for-building-a-web-site-a25b3f69c517#.iwdbbsomq' target='_blank'>this blog post </a> and build one of the projects listed. Use jQuery to do some basic animation, click events and show/hide different content sections."
                },
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Javascript For Back End: "," Node.js "],
                    ["Data Visualization: "," D3.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "node":{
                "title": "Javascript- Node.js",
                "short": "Node.js",
                "summary": "Javascript throughout your stack for modern web apps",
                "img": "/img/catImg/nodejs.png",
                "challenge1": {
                    "short": "Build an entire simple site",
                    "full": "Check out <a href='https://medium.com/@kevink/6-absurd-ideas-for-building-your-first-web-application-24afca35e519' target='_blank'>this blog post</a> and build one of the projects listed."
                },
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Data Visualization: "," D3.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "d3":{
                "title": "Javascript- D3.js",
                "short": "D3.js",
                "summary": "The best data visualization library on the web",
                "img": "/img/catImg/d3logo.png",
                "challenge1": {
                    "short": "Build your first bar graph",
                    "full": "Download a <a href='https://support.spatialkey.com/spatialkey-sample-csv-data/' target='_blank'>sample .csv dataset</a> and turn one relevant metric into a bar graph."
                },
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Javascript For Back End: "," Node.js "],
                    ["Easily Connect Back And Front End: "," React "]
                ]
            },
            "react":{
                "title": "Javascript- React.js",
                "short": "React.js",
                "summary": "Untangle your front-end with a MVC framework",
                "img": "/img/catImg/reactlogo.png",
                "challenge1": {
                    "short": "Build an entire simple site",
                    "full": "Check out <a href='https://medium.com/@kevink/6-absurd-ideas-for-building-your-first-web-application-24afca35e519' target='_blank'>this blog post </a> and build one of the projects listed."
                },
                "reqs": ["HTML/CSS Fundamentals", " Javascript Fundamentals ", " Node.js "],
                "next":[
                    ["Interactive Site Elements: "," JQuery "],
                    ["Data Visualization: "," D3.js "],
                    ["Store Data For Your Site: "," Databases "]
                ]
            }
        }
    },
    "databases":{
        "default":{
            "title": "Databases- All",
            "short": "Databases",
            "summary": "Store and manage data on your site",
            "reqs": [" Just be an internet user! "],
            "next":[
                ["Build Your Own Website: "," HTML/CSS "],
                ["Interactive Websites: "," Javascript "]
            ]
        },
        'subcat':{
            "fundamentals":{
                "title": "Databases- Fundamentals",
                "short": "Fundamentals",
                "summary": "Learn the basics of multiple popular relational databases",
                "img": "/img/catImg/databases.png",
                "challenge1": {
                    "short": "Set up a database on localhost",
                    "full": "Set up a database on your system and integrate it into an existing web app. If you need instructions, check out <a href='http://dev.mysql.com/downloads/mysql/' target='_blank'>this site</a> for details on setting up SQL."
                },
                "reqs": [" Just be an internet user! "],
                "next":[
                    ["Business/Marketing Insights: "," Intro to Analytics "],
                    ["Design A Scalable Database: "," Database Management "]
                ]
            },
            "analytics":{
                "title": "Databases- Intro to Analytics",
                "short": "Analytics",
                "summary": "Create insights for business/marketing decisions",
                "img": "/img/catImg/analytics.png",
                "challenge1": {
                    "short": "Run analytics on an example database",
                    "full": "Imagine that you are a data analyst for a human resources consulting company. Your client wants to find trends in their employee retention stats. Download <a href='https://dev.mysql.com/doc/employee/en/employees-introduction.html' target='_blank'>this employee database</a>, and find three key insights that might be worth reporting to the client."
                },
                "reqs": [" Database Fundamentals "],
                "next":[
                    ["Design A Scalable Database: "," Database Management "]
                ]
            },
            "dbmgmt":{
                "title": "Databases- Management",
                "short": "Management",
                "summary": "Make sure you store all the appropriate info in a scalable way",
                "img": "/img/catImg/databasemanagement.png",
                "challenge1": {
                    "short": "Redesign an existing database",
                    "full": "Check out <a href='https://dev.mysql.com/doc/employee/en/employees-introduction.html' target='_blank'>this existing employee database</a>, and think of a new way to structure the tables. Alternatively, think of one table that might be worth adding, and how you might refactor to accomodate that table."
                },
                "reqs": [" Database Fundamentals "],
                "next":[
                    ["Business/Marketing Insights: "," Intro to Analytics "]
                ]
            }
        }
    }
}