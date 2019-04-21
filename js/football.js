var loading = true;
(function(jQuery,win){
	var total_time = 30;
	var surplus_time = 0;//剩余时间
	var point = 0;//得分
	var game_timer ,container_timer = null;
	var container = new Array(1,2,3);
	var ball_last_pos = false;
	var ball_list = $('.m_q li');
	var container_list = $('.m_kt li');
	surplus_time = total_time;
	var speed = 400;
	var ready_time = 3;
	var keeper_face_timer = null;
	var keeper_face = 1;
	var keeper_pos = new Array(-11,35,56,5);
	var _football = {
		//初始化	
		init : function(start){
			console.log(surplus_time);
			var time_width = surplus_time/total_time*100*0.7;
			$('.m_game_time .m_gt').css('width',time_width+'%');
			$('.m_game_score .m_st').html(point);
			this.start(start);
		},
		retry : function(){
			surplus_time = total_time;
			point = 0;
			speed = 400;
			$('#play_again,#try_again').hide();
			ready_time = 3;
			this.ready_go();
		},
		start : function(start){
			//开始游戏
			var _This = this;
			//计算已经玩过的时间
			if(start){
				game_timer = setInterval(function(){
					surplus_time--;
					var time_width = surplus_time/total_time*100*0.7;
					$('.m_game_time .m_gt').css('width',time_width+'%');
					if(surplus_time <= 0){
						//没有剩余时间
						_This.stop();
						_This.game_finish();
					}
					else{
						var speed_mod = (surplus_time%5);
						if(speed_mod == 0){
							_This.stop();
							speed = (surplus_time/10+1)*100;
							_This.start(false);
						}
					}
				},1000);
			}
			//开始随机变换
			container_list.die().live('touchstart click',function(){
				if($(this).attr('data-shoot') == '1'){
					_This.shoot(this);
				}
			});
			if(container_timer === null){
				container_timer = setInterval(function(){
					container_list.attr('data-shoot','0').removeClass('m_kt1 m_kt2 m_kt3').addClass('m_kt1');
					ball_list.removeClass('cur');
					var rand_position = _This._ballpos();
					
					for(r in rand_position){
						container_list.eq(rand_position[r]-1).attr('data-shoot','1').removeClass('m_kt1 m_kt2 m_kt3').addClass('m_kt2');
						ball_list.eq(rand_position[r]-1).addClass('cur');
					}
				},speed);
			}
		},
		shoot : function(obj){
			//处理射门
			this.stop();//停止一切处理
			if(surplus_time <= 0){
				return false;
			}
			var ball_obj = ball_list.eq($(obj).index());
			$(obj).attr('data-shoot','0').removeClass('m_kt1 m_kt2 m_kt3').addClass('m_kt1');
			ball_obj.removeClass('cur');
			clearTimeout(keeper_face_timer);
			keeper_face_timer = null;
			this.keeper(ball_obj);
		},
		keeper : function (ball){
			var _This = this;
			point++;
			//获得守门员表情
			var face = this.keeper_face();
			$('.m_toux li').removeClass('cur');
			//console.log('.m_t'+face);
			$('.m_t'+face).addClass('cur');
			
			//1秒后恢复表情
			if(keeper_face_timer == null){
				keeper_face_timer = setTimeout(function(){
					$('.m_toux li[class!="m_t1"]').removeClass('cur');
					$('.m_t1').addClass('cur');
				},1000);
			}
			_This.init(false);
		},
		keeper_face : function(){
			var face = this._rand(3)+1;
			if(face == keeper_face){
				return this.keeper_face();
			}
			else{
				keeper_face = face;
				return face;
			}
		},
		game_finish : function(){
			//游戏结束
			clearInterval(game_timer);
			clearTimeout(keeper_face_timer);
			kepper_face = null;
			//计算分数
			var point_html = '';
			if(point<60){
				$('.m_toux li').removeClass('cur');
				$('.m_t1').addClass('cur');
				$('#fail_shoot_num').html(point);
				$('.m_astar').html('');
				$('#try_again').show();
				share_text = window._bd_share_config.common.bdText = '这游戏难度很高啊，我通关失败了，小伙伴们也来试试吧！';
			}
			else if(point >= 60 && point <80){
				share_text = window._bd_share_config.common.bdText = '我通关啦，小伙伴们快来参加吧，通关好难呀，小伙伴们快来帮我一起完成吧！';
				point_html = '<div class="m_star1"></div>';
				$('#succ_shoot_num').html(point);
				$('.m_toux li').removeClass('cur');
				$('.m_t5').addClass('cur');
				$('.m_astar').html(point_html);
				$('#play_again').show();
			}
			else if(point >= 80 && point < 150){
				share_text = window._bd_share_config.common.bdText = '我通关啦，小伙伴们快来参加吧，通关好难呀，小伙伴们快来帮我一起完成吧！';
				point_html = '<div class="m_star1"></div><div class="m_star2"></div>';
				$('#succ_shoot_num').html(point);
				$('.m_toux li').removeClass('cur');
				$('.m_t5').addClass('cur');
				$('.m_astar').html(point_html);
				$('#play_again').show();
			}
			else if(point >= 150){
				share_text = window._bd_share_config.common.bdText = '我通关啦，小伙伴们快来参加吧，通关好难呀，小伙伴们快来帮我一起完成吧！';
				point_html = '<div class="m_star1"></div><div class="m_star2"></div><div class="m_star3"></div>';
				$('#succ_shoot_num').html(point);
				$('.m_toux li').removeClass('cur');
				$('.m_t5').addClass('cur');
				$('.m_astar').html(point_html);
				$('#play_again').show();
			}
			$('#bd_share_script').remove();
			with(document){
				var share_js = createElement('script');
				share_js.id = 'bd_share_script';
				share_js.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5);
				(getElementsByTagName('head')[0]||body).appendChild(share_js);
			}
		},
		stop : function(){
			//游戏结束
			//clearInterval(game_timer);
			clearInterval(container_timer);
			container_timer = null;
			container_list.die();
		},
		instructions : function(){
			var _This = this;
			share_text = window._bd_share_config.common.bdText = document.title;
			$('#loading').hide();
			$('#game_page').show();
			loading = false;
			$('#op_tip').show().live('touchstart click',function(){
				$(this).hide();
				_This.ready_start();
			});
		},
		ready_start : function(){
			var _This = this;
			$('#start_button').show().live('touchstart click',function(){
				_This.ready_go();
			});
		},
		ready_go : function (){
			var _This = this;
			$('#start_button').hide();
			$('#ready_tip').show();
			var ready_timer = setInterval(function(){
				$('#ready_tip').hide();
				if(ready_time > 0){
					$('div[data-ready]').hide().filter('[data-ready="'+ready_time+'"]').show();
					ready_time --;
				}
				else{
					$('div[data-ready]').hide();
					clearInterval(ready_timer);
					$('.m_toux li').removeClass('cur');
					$('.m_t1').addClass('cur');
					_This.init(true);
				}
			},1000);
		},
		_rand : function(num){
			return Math.ceil(Math.random()*num);
		},
		_rand_sort : function(a,b){
			return Math.random()>.5 ? -1 : 1;
		},
		_ballpos : function(){
			var rand_arr = container.sort(this._rand_sort);//随机排序
			var rand_num = this._rand(2);//获得随机数量
			if(rand_num < 3){
				return rand_arr.slice(rand_num);
			}
			else{
				return rand_arr;
			}
		},
		_ballpos_old : function(){
			var rand_arr = container.sort(this._rand_sort);
			var last_pos = rand_arr.indexOf(2);
			if(last_pos === ball_last_pos){
				return this._ballpos();
			}
			else{
				ball_last_pos = last_pos;
				return rand_arr;
			}
		},
		_round : function (number,fractionDigits){
			with(Math){
				return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);
			}
		}
	};
	win['football'] = _football;
})(jQuery,window,document);