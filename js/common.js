var list_event = [
			{
				opponent_1: 'Соперник 6',
				opponent_2: 'Соперник 6',
				where: 'Стадион',
				date: '30 <br/>мая',
				time: '19.00'
			},
			{
				opponent_1: 'Соперник 3',
				opponent_2: 'Соперник 4',
				where: 'Стадион',
				date: '17  <br/>июня',
				time: '19.00'
			},
			{
				opponent_1: 'Соперник 1',
				opponent_2: 'Соперник 2',
				where: 'Стадион',
				date: '26  <br/>июня',
				time: '19.00'
			},
			{
				opponent_1: 'Соперник 7',
				opponent_2: 'Соперник 8',
				where: 'Стадион',
				date: '16  <br/>июля',
				time: '19.00'
			},
			{
				opponent_1: 'Соперник 99',
				opponent_2: 'Соперник 10',
				where: 'Стадион',
				date: '30  <br/>сентября',
				time: '19.00'
			},

		];
	
		
		
		
		
	class Slider {
		filling(event) {  // заполнение слайдов, принимает список объектов
			var my_slider_element="";
			event.forEach(function(element,index){
				var html='<li class="my_slider_elem" data-elem="'+index+'"><div class="my_slider_content"><div class="opponent_1">'+element['opponent_1']+'</div><div class="opponent_2">'+element['opponent_2']+'</div><div class="ins"><span class="where">'+element['where']+'</span><span class="date">'+element['date']+'</span><span class="time">'+element['time']+'</span><span class="by">Купить билет</span></div></div></li>';
				my_slider_element=my_slider_element+html;
			});
			$('#my_slider').html(my_slider_element);
		
		}
		first_active_slide(x) { // определяем индекс первого активного слайда
			$('#my_slider li[data-elem="'+x+'"]').addClass('active');
			this._neighbors();
		
		}
		
		

		_neighbors(){ // определяем ближайшие соседние, и следующие слайды
			var elem = $('.my_slider_elem.active');
			$('.my_slider_elem').each(function(){
				$(this).removeClass('next').removeClass('prev').removeClass('neighbors');
			});
			elem.next().addClass('neighbors').addClass('next');
			elem.next().next().addClass('neighbors');
			elem.prev().addClass('neighbors').addClass('prev');;
			elem.prev().prev().addClass('neighbors');
		}


		slide(num_slide){ // перелистываем слайдер на нужный слайд
			$('.my_slider_elem').each(function(){
				$(this).removeClass('active');
			});
			$('.my_slider_elem[data-elem='+num_slide+']').addClass('active');
			this._neighbors();
		}	
	}
	
	
	
	
	var slider = new Slider;  // инициализация слайдера
	slider.filling(list_event); // наполнение слайдов данными
	slider.first_active_slide(2); // оределяем первый активный элемент, который будет в центре
	
	$('.my_slider_elem').click(function(){	//событие нажатия по элементу
		if(!$(this).hasClass('active')){	
			var num_slide = $(this).attr('data-elem');
			slider.slide(num_slide);		// перелистывем на нажатый элемент.
		}
	});
		
	
	
	
	var elem = document.getElementById('my_slider');  // отслеживаем прокрутку мыши над блоком #my_slider
	var  interrupt = 0;		//счетчик, для ограничения по времени пемемотки слайдов при повороте колесиком мыши
	
    if (elem.addEventListener) {
      if ('onwheel' in document) {
        // IE9+, FF17+
        elem.addEventListener("wheel", onWheel);
      } else if ('onmousewheel' in document) {
        // устаревший вариант события
        elem.addEventListener("mousewheel", onWheel);
      } else {
        // Firefox < 17
        elem.addEventListener("MozMousePixelScroll", onWheel);
      }
    } else { // IE8-
      elem.attachEvent("onmousewheel", onWheel);
    }
    // Это решение предусматривает поддержку IE8-
    function onWheel(e) {
		e = e || window.event;

		// deltaY, detail содержат пиксели
		// wheelDelta не дает возможность узнать количество пикселей
		// onwheel || MozMousePixelScroll || onmousewheel
		var delta = e.deltaY || e.detail || e.wheelDelta;
		var num_slide = +$('.my_slider_elem.active').attr('data-elem');		// номер текушего слайда
		var last_slide = +$('ul .my_slider_elem:last-child').attr('data-elem');	// номер последненго слайда в слайдере
		  
			if (delta>0 && num_slide>0){  // если колесо мышки прокрутили вниз и слайд не является первым
				num_slide=num_slide-1;
			} else if (delta<0 && num_slide<last_slide) { // если колесо мышки прокрутили вверх и слайд не является последним
				num_slide=num_slide+1;
			}
			
			if( interrupt==0 ){  // ставим ограничитель срабатывания функции
				interrupt=1;	// ограничитель не дает функции стработать
				slider.slide(num_slide); // функция перелистывания слайда
				setTimeout(function(){interrupt=0;},250); // через 250мс снимаем ограничение на срабатывание функции
			}
				
		e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }