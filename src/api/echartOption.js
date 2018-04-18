export const getBarOpt = (data) => {

	let option = {

		color: ['#26a69a','#409EFF'],
	    title : {
	        text: '',
	        subtext: ''
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['蒸发量','降水量']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            // mark : {show: true},
	            // dataView : {show: true, readOnly: false},
	            // magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            // saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            data : ['1月','2月','3月']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'蒸发量',
	            type:'bar',
	            data:[2.0, 4.9, 7.0],
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'降水量',
	            type:'bar',
	            data:[2.6, 5.9, 9.0],
	            markPoint : {
	                data : [
	                    {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
	                    {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	        }
	    ]
	};
	                    

    return option;
}

export const getLineOpt = (data) => {

	let option = {

		color: ['#26a69a','#409EFF'],
	    title : {
	        text: '',
	        subtext: ''
	    },
	    tooltip : {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['最高气温','最低气温']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            // mark : {show: true},
	            // dataView : {show: true, readOnly: false},
	            // magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            // saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : ['周一','周二','周三','周四','周五','周六','周日']
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            axisLabel : {
	                formatter: '{value} °C'
	            }
	        }
	    ],
	    series : [
	        {
	            name:'最高气温',
	            type:'line',
	            data:[11, 11, 15, 13, 12, 13, 10],
	            markPoint : {
	                data : [
	                    {type : 'max', name: '最大值'},
	                    {type : 'min', name: '最小值'}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'最低气温',
	            type:'line',
	            data:[1, -2, 2, 5, 3, 2, 0],
	            markPoint : {
	                data : [
	                    {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
	                ]
	            },
	            markLine : {
	                data : [
	                    {type : 'average', name : '平均值'}
	                ]
	            }
	        }
	    ]
	};
	                    

    return option;
}

export const getPieOpt = (data) => {

	let option = {

		color: ['#26a69a','#409EFF', '#2bb713', '#08d9f1', '#08f1de'],
	    title : {
	        text: '',
	        subtext: '',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        // orient : 'vertical',
	        // x : 'left',
	        data:['one','tow','three','four','five']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            // mark : {show: true},
	            // dataView : {show: true, readOnly: false},
	            // magicType : {
	            //     show: true, 
	            //     type: ['pie', 'funnel'],
	            //     option: {
	            //         funnel: {
	            //             x: '25%',
	            //             width: '50%',
	            //             funnelAlign: 'left',
	            //             max: 1548
	            //         }
	            //     }
	            // },
	            restore : {show: true},
	            // saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    series : [
	        {
	            name:'one',
	            type:'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:335, name:'one'},
	                {value:310, name:'two'},
	                {value:234, name:'three'},
	                {value:135, name:'four'},
	                {value:1548, name:'five'}
	            ]
	        }
	    ]
	};
	                    

    return option;
}