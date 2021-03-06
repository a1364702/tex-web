(function (factory) {
    var activity = window.activity || (window.activity = {});
    var scope = activity.config || (activity.config = {});
    factory(scope);
})(function (scope) {
    /*
     // field
     fieldKey: { // fieldKey如果是带层级的，要用引号引起来
         name: '设置项', // 中文描述
         type: 'text', // 类型, text|midtext|longtext|textarea|select|datetime|number|map|array
         min: 0, // number下限
         max: 0, // number上线
         options: { val: 'text' }, // select选项，value=>说明
         printer: fn, // fn(object), 把json对象转换为配置文本项
         parser: fn, // 解析函数fn(text)，把文本解析成json对象，比如JSON.parse，parseInt
         checkValid: fn, // 校验配置是否合法函数fn(object, json)
         onChange: fn, // 字段被设置为指定值, fn(object)
         subFieldOption: {} // 子字段配置，可以是一个object，或者一个返回object的fn，参数为fieldKey，

         useWholeValue: false,  // type=map|array时有效，是否使用整个字段，如果为false则根据fieldKey取值，否则取整个字段本身
         vertical: false, // type=map|array时有效，是否竖向显示编辑框
         groupFieldOption: {  // type=map|array时有效，分组设置。里面不能再次嵌套map|array
            groupFieldKey: {
                 // 字段描述，同上，比如name, type, parser, ...
                useWholeValue: false, // 是否使用整个字段
                isMapKey: true, // type=map时必须设置一个，且只能一个，与map的key关联
                arrayIndex: 0, // type=array时必须设置，和数组的位置关联。
                                // useWholeValue, isMapKey, arrayIndex在groupFieldOption中只能包含一种
                isOptional: false, // 是否可选，会增加一个checkbox按钮
            }
         }
     }
     */

    // 通用选项
    var options = {
        optYesNo: {
            0: '否',
            1: '是'
        },
        ActType2:{
            1: '道具消耗',
            2: '酒馆抽武将次数',
            3: '关卡进度',
            4: '商店购买次数',
            5: '马匹配对次数',
            6: '宝物修复次数',
        },
        ActType3:{
            1: '道具消耗',
            2: '酒馆抽武将次数',
            3: '关卡进度',
            4: '商店购买次数',
            5: '马匹配对次数',
            6: '宝物修复次数',
            7: '列传模式总积分'
        },
        ActType4:{
            1: '成就等级',
            2: '武将数量',
            3: '关卡进度',
            4: '金币消耗',
            5: '钻石消耗',
            6: '玩家等级',
            7: '所有武将等级',
            8: '主线任务',
        },
    };

    // 工具函数
    var utils = {
        printItemNumOddsList: function(array) {
            if (!array) return undefined;

            var result = '';
            for (var i = 0; i < array.length; ++i) {
                if (i != 0) result += ';';
                result += array[i][0] + ',' + array[i][1] + ',' + array[i][2];
            }
            return result;
        },
        parseItemNumOddsList: function (text) {
            var result = [];
            var arr1, arr2, i, j, idnum, id, num, odds;
            arr1 = text.split(';');
            for (i = 0; i < arr1.length; ++i) {
                idnum = $.trim(arr1[i]);
                if (idnum == '') continue;

                arr2 = idnum.split(',');
                if (arr2.length != 3 || !$.isNumeric(arr2[0]) || !$.isNumeric(arr2[1]) || !$.isNumeric(arr2[2])) {
                    throw '格式错误(id,num,odds;id,num,odds)';
                }

                id = parseInt(arr2[0]);
                num = parseInt(arr2[1]);
                               odds = parseInt(arr2[2]);
                if (id < 0 || num < 0 || odds < 0) {
                    throw '三个数字均为正整数例如1,100,50;2,200,30;';
                }

                result.push([id, num, odds]);
            }
            return result;
        },
        printItemNumList: function(array) {
            if (!array) return undefined;

            var result = '';
            for (var i = 0; i < array.length; ++i) {
                if (i != 0) result += ';';
                result += array[i][0] + ',' + array[i][1];
            }
            return result;
        },
        parseItemNumList: function (text) {
            var result = [];
            var arr1, arr2, i, j, idnum, id, num;
            arr1 = text.split(';');
            for (i = 0; i < arr1.length; ++i) {
                idnum = $.trim(arr1[i]);
                if (idnum == '') continue;

                arr2 = idnum.split(',');
                if (arr2.length != 2 || !$.isNumeric(arr2[0]) || !$.isNumeric(arr2[1])) {
                    throw '格式错误(id,num;id,num)';
                }

                id = parseInt(arr2[0]);
                num = parseInt(arr2[1]);
                if (id < 0 || num < 0) {
                    throw '道具ID或数量错误';
                }

                result.push([id, num]);
            }
            return result;
        },
     	printIdList: function(array) {
			if (!array) return '';
			
			var result = '';
			for (var i = 0; i < array.length; ++i) {
				if (i != 0) result += ';';
				result += array[i];
			}
			return result;
		},
		parseIdList: function (text) {
			var result = [];
			var arr, i, iId, sId;
			arr = text.split(';');
			for (i = 0; i < arr.length; ++i) {
				sId = $.trim(arr[i]);
				if (sId == '') continue;
				
				if (!$.isNumeric(sId)) {
					throw '格式错误(id1;id2;id3)';
				}
				iId = parseInt(sId);
				
				result.push(iId);
			}
			return result;
		},
		printSuffixList: function(array) {
            if (!array) return '';

            var result = '';
            for (var i = 0; i < array.length; ++i) {
                if (i != 0) result += ';';
                result += array[i];
            }
            return result;
        },
        parseSuffixList: function (text) {
            var result = [];
            var arr, i, iId, sId;
            arr = text.split(';');
            for (i = 0; i < arr.length; ++i) {
                sId = $.trim(arr[i]);
                if (sId == '') continue;

                if (!$.isNumeric(sId)) {
                    throw '格式错误(id1;id2;id3)';
                }
				iId = parseInt(sId);
				if (iId > 9)
				{
					throw '数值错误(id取值[0,1,2,3,4,5,6,7,8,9])';
				}

                result.push(iId);
            }
            return result;
        },
        changeActivityType: function (type) {
            currentActivityType = type;
        },
        getFieldOptionByActivity: function (fieldKey) {
            var activityType = activityTypeDefine[currentActivityType];
            if (activityType && activityType.fieldOption) {
                return activityType.fieldOption[fieldKey];
            }
            return undefined;
        }
    };

    // 活动类型定义
    var activityTypeDefine = {};
    // 1
    activityTypeDefine[1] = {
        name: '模块控制',
        fieldOption: {
            comm_param: {
                close_cmd: {
                    name: '关闭协议(,分隔)',
                    type: 'longtext'
                },
            }
		}
    };
    // 2
    activityTypeDefine[2] = {
        name: '个人消耗',
        fieldOption: {
            comm_param: {
                type: {
                    name: '子类型',
                    type: 'select',
                    options: options.ActType2,
                    parser: parseInt,
                },
                itemid: {
                    name: '道具id',
                    type: 'text',
                },
                shopid: {
                    name: '商店id',
                    type: 'text',
                },
                rank: {
                     name: '完成奖励',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                            name: '完成条件',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                            name: '奖励:id,num',
                            type: 'longtext',
                            printer: utils.printItemNumList,
                            parser: utils.parseItemNumList
                         }
                     }
                 }
            }
        }
    };
    // 3
    activityTypeDefine[3] = {
        name: '冲榜',
        fieldOption: {
            comm_param: {
                type: {
                    name: '子类型',
                    type: 'select',
                    options: options.ActType3,
                    parser: parseInt,
                },
                itemid: {
                    name: '道具id',
                    type: 'text',
                },
                shopid: {
                    name: '商店id',
                    type: 'text',
                },
                rank: {
                     name: '排名奖励',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '排名:from_to',
                             type: 'text',
                             isMapKey: true
                         },
                         reward: {
                             name: '奖励:id,num',
                             type: 'longtext',
                             printer: utils.printItemNumList,
                             parser: utils.parseItemNumList
                         }
                     }
                 }
            },
        }
    };
    // 4
    activityTypeDefine[4] = {
        name: '累计充值',
        fieldOption: {
            comm_param: {
                everyday: {
                    name: '每日充值奖励',
                    type: 'map',
                    groupFieldOption: {
                         _: {
                            name: '完成条件',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                           name: '奖励:id,num',
                           type: 'longtext',
                           printer: utils.printItemNumList,
                           parser: utils.parseItemNumList
                        }
                    }
                },
                totalMoney: {
                    name: '累计充值奖励',
                    type: 'map',
                    groupFieldOption: {
                         _: {
                            name: '完成条件',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                           name: '奖励:id,num',
                           type: 'longtext',
                           printer: utils.printItemNumList,
                           parser: utils.parseItemNumList
                        }
                    }
                },
                totalDays: {
                    name: '累天充值奖励',
                    type: 'map',
                    groupFieldOption: {
                         _: {
                            name: '完成条件',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                           name: '奖励:id,num',
                           type: 'longtext',
                           printer: utils.printItemNumList,
                           parser: utils.parseItemNumList
                        }
                    }
                }
            }
        }
    };
    // 5
    activityTypeDefine[5] = {
        name: '首冲送英雄',
        fieldOption: {
            comm_param: {
                heroid: {
                    name: '英雄id',
                    type: 'text',
                    parser: parseInt
                }
            },
            client_param: {
                show_count_down: {
                    name: '是否显示倒计时',
                    type: 'select',
                    options: {
                        '0' : '不显示',
                        '1' : '显示',
                    }    
                },
                background_img: {
                    name: '背景',
                    type: 'longtext',
                }
            }
        }
    };
    // 6
    activityTypeDefine[6] = {
        name: '一元购',
        fieldOption: {
            comm_param: {
                reward: {
                    name: '奖励:id,num',
                    type: 'longtext',
                    printer: utils.printItemNumList,
                    parser: utils.parseItemNumList
                },
                productid: {
                    name: '商品id',
                    type: 'text',
                    parser: parseInt
                }
            },
            client_param: {
                price: {
                    name: '原价',
                    type: 'text',
                },
                background_img: {
                    name: '背景',
                    type: 'longtext',
                }
            }
        }
    };
    // 7
    activityTypeDefine[7] = {
        name: '七日登录',
        fieldOption: {
            comm_param: {
                days: {
                    name: '天数',
                    type: 'map',
                    groupFieldOption: {
                         _: {
                            name: '第几天',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                           name: '奖励:活跃度;id,num',
                           type: 'longtext',
                        }
                    }
                }
            },
            client_param: {
                background_img: {
                    name: '背景',
                    type: 'longtext',
                }
            }
        }
    };
    // 8
    activityTypeDefine[8] = {
        name: '免费福利',
        fieldOption: {
            comm_param: {
                reward: {
                   name: '奖励:id,num',
                   type: 'longtext',
                   printer: utils.printItemNumList,
                   parser: utils.parseItemNumList
                },
            },
            server_param: {
                condition: {
                    name: '达成条件',
                    type: 'select',
                    options: {
                        '1': '购买月卡',
                        '2': '通关关卡'
                    },
                    parser: parseInt
                },
                cond_param: {
                    name: '条件参数',
                    type: 'text',
                    parser: parseInt
                }
            },
            client_param: {
                one_time: {
                    name: '是否显示one_time offer',
                    type: 'select',
                    options: {
                        '0' : '不显示',
                        '1' : '显示',
                    }
                }
            }
        }
    };
    // 9
    activityTypeDefine[9] = {
        name: '成长基金',
        fieldOption: {
            comm_param: {
                step: {
                    name: '奖励',
                    type: 'map',
                    groupFieldOption: {
                         _: {
                            name: '档位',
                            type: 'text',
                            isMapKey: true,
                            parser: parseInt
                         },
                         reward: {
                           name: '奖励:id,num',
                           type: 'longtext',
                           printer: utils.printItemNumList,
                           parser: utils.parseItemNumList
                         }
                    }
                },
                productid: {
                    name: '商品id',
                    type: 'text',
                    parser: parseInt
                }
            },
            client_param: {
                price: {
                    name: '原价',
                    type: 'text',
                    parser: parseInt
                },
                background_img: {
                    name: '背景',
                    type: 'longtext',
                }
            },
            server_param: {
                condition: {
                    name: '领取条件',
                    type: 'select',
                    options: {
                        '1': '登录',
                        '2': '通关关卡'
                    },
                    parser: parseInt
                }
            }
        }
    };
    // 10
    activityTypeDefine[10] = {
        name: '个性化活动',
        fieldOption: {
            comm_param: {
                reward: {
                    name: '奖励:id,num',
                    type: 'longtext',
                    printer: utils.printItemNumList,
                    parser: utils.parseItemNumList
                },
                buy_times: {
                    name: '最大购买次数',
                    type: 'text',
                    parser: parseInt
                }
            },
            client_param: {
                discount: {
                    name: '折扣',
                    type: 'text',
                    parser: parseInt
                },
                icon: {
                    name: '角标',
                    type: 'text',
                },
                detail_bg: {
                    name: '活动背景',
                    type: 'text',
                },
                list_bg: {
                    name: '列表背景',
                    type: 'text',
                }
            },
            server_param: {
                trigger_point: {
                    name: '触发点',
                    type: 'select',
                    options: {
                        '1': '玩家升级',
                        '2': '英雄升级',
                        '3': '英雄升星',
                        '4': '酒馆抽英雄',
                        '5': '登录触发',
                        '6': '剧情模式失败',
                        '7': '购买金币',
                    },
                    parser: parseInt
                },
                trigger_interval: {
                    name: '触发间隔(秒)',
                    type: 'text',
                    parser: parseInt
                },
                trigger_times: {
                    name: '触发次数',
                    type: 'text',
                    parser: parseInt
                },
                last_time: {
                    name: '持续时间(秒)',
                    type: 'text',
                    parser: parseInt
                },
                productid: {
                    name: '商品id列表(,区分)',
                    type: 'text',
                },
                coin_range: {
                    name: '金币范围(-区分)',
                    type: 'midtext',
                },
                diamond_range: {
                    name: '元宝范围(-区分)',
                    type: 'midtext',
                },
                role_level_range: {
                    name: '玩家等级范围(-区分)',
                    type: 'midtext',
                },
                recharge_money_range: {
                    name: '充值金额范围(-区分)',
                    type: 'midtext',
                },
                recharge_last_time: {
                    name: 'N天前充值',
                    type: 'midtext',
                    parser: parseInt,
                },
                vippoint_range: {
                    name: 'vip点范围(-区分)',
                    type: 'midtext',
                },
                recharge_times_range: {
                    name: '付费次数范围(-区分)',
                    type: 'midtext',
                },
                hero_level_range: {
                    name: '当前英雄等级范围(-区分)',
                    type: 'midtext'
                },
                hero_star_range: {
                    name: '当前英雄星级范围(-区分)',
                    type: 'midtext'
                },
                no_heroids: {
                    name: '没有英雄(;区分)',
                    type: 'midtext',
                },
                hero_num_range: {
                    name: '英雄数量范围(-区分)',
                    type: 'midtext'
                },
                month_card_left: {
                    name: '月卡剩余天数',
                    type: 'midtext',
                    parser: parseInt,
                },
                month_card_expire: {
                    name: '月卡过期天数',
                    type: 'midtext',
                    parser: parseInt,
                },
                stage_range: {
                    name: '剧情模式关卡范围(-区分)',
                    type: 'midtext',
                },
            }
        }
    };
    // 11
    activityTypeDefine[11] = {
        name: '在线时长奖励',
        fieldOption: {
            comm_param: {
                days: {
                     name: '第几天',
                     type: 'map',
                     vertical: true,
                     groupFieldOption: {
                         _: {
                             name: '天数',
                             type: 'text',
                             isMapKey: true
                         },
                         step: {
                             name: '时长奖励:时长:id,num;id,num|时长:id,num;id,num',
                             type: 'textarea',
                         }
                     }
                 }
            },
        }
    };
    // 12
    activityTypeDefine[12] = {
        name: '英雄众筹',
        fieldOption: {
            comm_param: {
                heroes: {
                     name: '英雄id',
                     type: 'map',
                     vertical: true,
                     groupFieldOption: {
                         _: {
                             name: '英雄id',
                             type: 'text',
                             isMapKey: true
                         },
                         step: {
                             name: '指定人数:商品id:id,num;id,num',
                             type: 'textarea',
                         },
                     }
                 }
            },
            client_param: {
                heroes: {
                     name: '英雄id',
                     type: 'map',
                     vertical: true,
                     groupFieldOption: {
                         _: {
                             name: '英雄id',
                             type: 'text',
                             isMapKey: true
                         },
                         icon: {
                             name: '显示图片路径',
                             type: 'text',
                         },
                     }
                 }
            },
        }
    };
    // 13
    activityTypeDefine[13] = {
        name: '许愿',
        fieldOption: {
            comm_param: {
                type: {
                    name: '子类型',
                    type: 'select',
                    options: options.ActType4,
                    parser: parseInt,
                },
                rank: {
                     name: '档位',
                     type: 'map',
                     vertical: true,
                     groupFieldOption: {
                         _: {
                             name: '排名',
                             type: 'text',
                             isMapKey: true
                         },
                         step: {
                             name: '档位名字:商品id:id,num;id,num',
                             type: 'textarea',
                         },
                     }
                 }
            },
        }
    };
    // 14
    activityTypeDefine[14] = {
         name: '英雄兑换',
         fieldOption: {
             comm_param: {
                 heros: {
                     name: '英雄',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '英雄id',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         items: {
                             name: '道具:id,num',
                             type: 'text',
                             printer: utils.printItemNumList,
                             parser: utils.parseItemNumList
                         }
                     }
                 }
            },
            client_param: {
                heroes: {
                     name: '英雄id',
                     type: 'map',
                     vertical: true,
                     groupFieldOption: {
                         _: {
                             name: '英雄id',
                             type: 'text',
                             isMapKey: true
                         },
                         icon: {
                             name: '显示图片路径',
                             type: 'text',
                         },
                     }
                 }
            },
         }
    };
    // 15
    activityTypeDefine[15] = {
         name: '幸运转盘',
         fieldOption: {
             comm_param: {
                 play_diamond: {
                     name: '转动一次需要钻石',
                     type: 'text',
                     parser: parseInt,
                 },
                 wheels: {
                     name: '格子',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '格子id',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '道具，格式:id,num;权重(万分比);展示类型(1上,2下);走马灯显示(0不显示,1显示)',
                             type: 'longtext',
                         }
                     }
                 },
                 times: {
                     name: '每日转动奖励',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '次数',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '道具:id,num',
                             type: 'midtext',
                             printer: utils.printItemNumList,
                             parser: utils.parseItemNumList
                         }
                     }
                 },
                 rank: {
                     name: '排行奖励',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '排名',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '道具:id,num',
                             type: 'midtext',
                             printer: utils.printItemNumList,
                             parser: utils.parseItemNumList
                         }
                     }
                 }
            },
        }
    };
    // 16
    activityTypeDefine[16] = {
         name: '邀请有礼',
         fieldOption: {
             comm_param: {
                 bind_diamond: {
                     name: '绑定成功获得的钻石',
                     type: 'text',
                     parser: parseInt,
                 },
                 bind_reward: {
                     name: '绑定人数奖励',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '人数',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '奖励，格式 道具id,道具数量',
                             type: 'text',
                         }
                     }
                 },
                 bind_main_quest: {
                     name: '绑定主线任务',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: '主线任务id',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '奖励，格式 人数:道具id,道具数量;道具id,道具数量|人数:道具id,道具数量;道具id,道具数量',
                             type: 'longtext',
                         }
                     }
                 },
                 bind_vip: {
                     name: '绑定vip等级',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: 'vip等级',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '奖励，格式 人数:道具id,道具数量;道具id,道具数量|人数:道具id,道具数量;道具id,道具数量',
                             type: 'longtext',
                         }
                     }
                 },
             },
        }
    },
    // 17
    activityTypeDefine[17] = {
         name: 'vip福利',
         fieldOption: {
             comm_param: {
                 vip_reward: {
                     name: 'vip等级',
                     type: 'map',
                     groupFieldOption: {
                         _: {
                             name: 'vip等级',
                             type: 'text',
                             isMapKey: true,
                             parser: parseInt
                         },
                         reward: {
                             name: '奖励，格式 道具id,道具数量',
                             type: 'text',
                         }
                     }
                 }
             }
        }
    };
	
    // 当前活动类型
    var currentActivityType;

    // 语言翻译配置项
    var langFieldOption = {
        'info.title': {
            name: '活动标题',
            type: 'longtext'
        },
        'info.brief_desc': {
            name: '简要描述',
            type: 'longtext'
        },
        'info.detail_desc': {
            name: '详细描述',
            type: 'textarea'
        },
        'info.icon': {
            name: '活动图标',
            type: 'longtext'
        },
        'info.jump_url': {
            name: '跳转链接',
            type: 'longtext'
        },
        client_param: {
            name: '客户端私有参数',
            type: 'textarea',
            parser: JSON.parse,
            subFieldOption: utils.getFieldOptionByActivity
        }
    };

    // 活动主配置项
    var mainFieldOption = {
        type: {
            name: '活动类型',
            type: 'select',
            options: (function () {
                var optionsActivityType = {};
                optionsActivityType[0] = '-- 请选择 --';
                for (var k in activityTypeDefine) {
                    optionsActivityType[k] = k + ': ' + activityTypeDefine[k].name;
                }
                return optionsActivityType;
            })(),
            checkValid: function (type) {
                if (type !== undefined && !activityTypeDefine[type]) {
                    return '未知的活动类型: ' + type;
                }
                return true;
            },
            parser: parseInt,
            onChange: utils.changeActivityType
        },
		'info.close': {
            name: '紧急关闭活动',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'info.title': {
            name: '活动标题',
            type: 'longtext'
        },
        'info.desc_brief': {
            name: '简要描述',
            type: 'longtext'
        },
        'info.desc_detail': {
            name: '详细描述',
            type: 'textarea'
        },
		'info.icon': {
            name: '活动图标',
            type: 'longtext'
        },
        'info.jump_url': {
            name: '跳转链接',
            type: 'longtext'
        },
        'info.jump_ui': {
            name: '跳转界面',
            type: 'text'
        },
        'info.hide_from_list': {
            name: '活动列表隐藏',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'info.top': {
            name: '是否置顶:显示排序-优先级仅次于主推',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'info.major': {
            name: '是否主推:开启游戏弹出活动',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'info.hide_on_finish': {
            name: '完成后从列表隐藏',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'info.hide_jump_button': {
            name: '隐藏跳转按钮',
            type: 'select',
            options: options.optYesNo,
            parser: parseInt
        },
        'constrain.begin_time': {
            name: '活动开始时间',
            type: 'datetime',
        },
        'constrain.end_time': {
            name: '活动结束时间',
            type: 'datetime',
        },
        'constrain.show_begin_time': {
            name: '展示开始时间',
            type: 'datetime'
        },
        'constrain.show_end_time': {
            name: '展示结束时间',
            type: 'datetime'
        },
        'constrain.server_publish_day_begin': {
            name: '开服天数开始',
            type: 'number',
            parser: parseInt
        },
        'constrain.server_publish_day_end': {
            name: '开服天数结束',
            type: 'number',
            parser: parseInt
        },
        'constrain.server_publish_day_show_begin': {
            name: '开服天数展示开始',
            type: 'number',
            parser: parseInt
        },
        'constrain.server_publish_day_show_end': {
            name: '开服天数展示结束',
            type: 'number',
            parser: parseInt
        },
        'constrain.server_publish_day_last_time': {
            name: '持续时间',
            type: 'number',
            parser: parseInt
        },
        'constrain.reg_day_begin': {
            name: '创角天数开始',
            type: 'number',
            parser: parseInt
        },
        'constrain.reg_day_end': {
            name: '创角天数结束',
            type: 'number',
            parser: parseInt
        },
        'constrain.reg_day_show_begin': {
            name: '创角展示天数开始',
            type: 'number',
            parser: parseInt
        },
        'constrain.reg_day_show_end': {
            name: '创角展示天数结束',
            type: 'number',
            parser: parseInt
        },
        comm_param: {
            name: '公有参数',
            type: 'textarea',
            parser: JSON.parse,
            subFieldOption: utils.getFieldOptionByActivity,
        },
        server_param: {
            name: '服务端私有参数',
            type: 'textarea',
            parser: JSON.parse,
            subFieldOption: utils.getFieldOptionByActivity
        },
        client_param: {
            name: '客户端私有参数',
            type: 'textarea',
            parser: JSON.parse,
            subFieldOption: utils.getFieldOptionByActivity
        },
        'language.en': {
            name: '英文翻译',
            type: 'textarea',
            parser: JSON.parse,
            subFieldOption: langFieldOption
        }
    };

    // 导出配置
    scope.mainFieldOption = mainFieldOption;
    scope.activityTypeDefine = activityTypeDefine;
});
