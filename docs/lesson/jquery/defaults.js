
var moduleID = '0000';

$(document).ready(function () {
	$('.tab-pane > h3').each(function () {
		$(this).insertBefore($(this).parent());
	});
});
$(document).ready(function () {
	if (printVersion) {
		$(document.body).addClass('prt');
	}
	else {
		$(document.body).addClass('dyn');
	};
});

$(function () {
	$('.sortable').sortable({ placeholder: 'ui-state-highlight' });
	$('.sortable').disableSelection();
});

$(function () {
	$('.back-top').hide();
	$(function () {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				$('.back-top').fadeIn();
			} else {
				$('.back-top').fadeOut();
			}
		});
		$('.back-top a').click(function () {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
	});
});

$(function () {
	$('[data-toggle="tooltip"]').tooltip();
	$('.lc-tip, .lc-tip-top').tooltip({ placement: 'top' });
	$('.lc-tip-right').tooltip({ placement: 'right' });
	$('.lc-tip-bottom').tooltip({ placement: 'bottom' });
	$('.lc-tip-left').tooltip({ placement: 'left' });

	$('[data-toggle="popover"]').popover();
	$('.lc-pop, .lc-pop-top').popover({ placement: 'top' });
	$('.lc-pop-right').popover({ placement: 'right' });
	$('.lc-pop-bottom').popover({ placement: 'bottom' });
	$('.lc-pop-left').popover({ placement: 'left' });
});

$(function () {
	$('body').scrollspy({ target: '.sidebar-toc' });
});

$(function () {

	$('.radio .submit-button').click(function () {
		var my_boolean = false;
		for (i = 1; i < this.form.length - 1; i++) {
			if (this.form[i].checked == true) {
				my_boolean = true;
			}
		}//end for loop

		if (my_boolean) {
			$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
			$(this).parent().parent().parent().children('.answer')
				.css('display', 'block');
			$(this).parent().parent().parent().children('.message')
				.css('display', 'none');
			$(this).siblings('.correct')
				.addClass('correct-answer');

			$(this).closest('.question-wrap').next('.show-after').show();
			$(this).closest('.interaction-question').next('.show-after').show();
			$(this).closest('.show-after').next('.show-after').show();
		} else {
			$(this).parent().parent().parent().children('.answer')
				.css('display', 'none');
			$(this).parent().parent().parent().children('.message')
				.css('display', 'block');
			$(this).siblings('.correct')
				.removeClass('correct-answer');
		}//end if else

		$(window).trigger('resize.twentytwenty');
		
	});

	$('.checkboxes .submit-button').click(function () {
		var my_boolean = false;
		for (i = 1; i < this.form.length - 1; i++) {
			if (this.form[i].checked == true) {
				my_boolean = true;
			}
		}//end for loop

		if (my_boolean) {
			$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
			$(this).parent().parent().parent().children('.answer')
				.css('display', 'block');
			$(this).parent().parent().parent().children('.message')
				.css('display', 'none');
			$(this).siblings('.correct')
				.addClass('correct-answer');

			$(this).closest('.question-wrap').next('.show-after').show();
			$(this).closest('.interaction-question').next('.show-after').show();
			$(this).closest('.show-after').next('.show-after').show();
		} else {
			$(this).parent().parent().parent().children('.answer')
				.css('display', 'none');
			$(this).parent().parent().parent().children('.message')
				.css('display', 'block');
			$(this).siblings('.correct')
				.removeClass('correct-answer');
		}//end if else
	});

	$('.textentry .submit-button').click(function () {
		$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
		$(this).closest('.question-wrap').find('.answer').show();
		$(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
		$(this).closest('.question-wrap').next('.show-after').show();

		$(this).closest('.interaction-question').next('.show-after').show();
		$(this).closest('.show-after').next('.show-after').show();
	});

	$('.req-text').each(function () {
		$('.req-text .submit-button').click(function () {
			var inputText = $(this).parent().find('.text-response').val();
			var characterMin = $(this).parent().find('.text-response').attr('data-text-min');

			if (inputText.length > characterMin) {
				$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
				$(this).closest('.question-wrap').find('.answer').show();
				$(this).closest('.question-wrap').find('.correct').addClass('correct-answer');
				$(this).closest('.question-wrap').next('.show-after').show();
				$(this).parent().parent().siblings('.message').css('display', 'none');

				$(this).closest('.interaction-question').next('.show-after').show();
				$(this).closest('.show-after').next('.show-after').show();
			}
			else {
				$(this).parent().parent().siblings('.message').css('display', 'block');
			}
		});
	});

	$('.inlinedropdowns .submit-button').click(function () {
		var my_boolean = false;
		var ddArray = [];
		var ddCount = $(this).parents('.inlinedropdowns').find('select option:selected').length;
		for (i = 0; i < ddCount; i++) {
			var selectedOption = $(this).parents('.inlinedropdowns').find('select').eq(i).children('option:selected').val();
			ddArray.push(selectedOption);
			if (selectedOption !== "--") {
				my_boolean = true;
			}
		}//end for loop
		if (my_boolean) {
			$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
			$(this).parent().children('.dropdown_correct').css('display', 'block');
			$(this).parent().parent().parent().children('.answer').css('display', 'block');
			$(this).parent().parent().siblings('.message').css('display', 'none');
			$(this).siblings('.correct').addClass('correct-answer');

			$(this).closest('.question-wrap').next('.show-after').show();
			$(this).closest('.interaction-question').next('.show-after').show();
			$(this).closest('.show-after').next('.show-after').show();
			$(window).trigger('resize.twentytwenty');
		} else {
			$(this).parent().parent().siblings('.message').css('display', 'block');
		}
	});

	$('.reordering .submit-button').click(function () {
		$(this).attr('disabled', 'disabled').addClass('btn-default').removeClass('btn-primary');
		$(this).parent().children('.dropdown-correct')
			.css('display', 'block');
		$(this).parent().parent().parent().children('.answer')
			.css('display', 'block');
		$(this).siblings('.correct')
			.addClass('correct-answer');

		$(this).closest('.question-wrap').next('.show-after').show();
		$(this).closest('.interaction-question').next('.show-after').show();
		$(this).closest('.show-after').next('.show-after').show();
	});

	$('.show-after').hide();

	$('.question-wrap-drag .done_drag').click(function () {
		$(this).closest('.question-wrap-drag').find('.answer').show();
		$(this).closest('.question-wrap-drag').find('.correct').addClass('correct-answer');
		$(this).closest('.question-wrap-drag').next('.show-after').show();
		$(this).parents('.interaction-question').next('.show-after').show();
		$(window).resize();
	});
	$('.question-wrap-drag .reset_drag').click(function () {
		$(this).closest('.question-wrap-drag').find('.answer').hide();
		$(this).closest('.question-wrap-drag').find('.correct').removeClass('correct-answer');
		$(this).closest('.question-wrap-drag').next('.show-after').hide();
	});

	$('.question-wrap-draw .done').click(function () {
		$(this).closest('.question-wrap-draw').find('.answer').show();
		$(this).closest('.question-wrap-draw').find('.correct').addClass('correct-answer');
		$(this).closest('.question-wrap').find('.answer').show();
		$(this).closest('.question-wrap-draw').next('.show-after').show();
		$(window).trigger('resize.twentytwenty');
	});
	$('.question-wrap-draw .reset').click(function () {
		$(this).closest('.question-wrap-draw').find('.answer').hide();
		$(this).closest('.question-wrap-draw').find('.correct').removeClass('correct-answer');
		$(this).closest('.question-wrap').find('.answer').show();
		$(this).closest('.question-wrap-draw').next('.show-after').hide();
	});

});

$(document).ready(function () {
	$('.radio-image-selector').each(function () {
		$(this).find('.rs-list li input').each(function (r) {
			var inputValue = r;
			$(this).val(r);
		});
		var currentInput = $(this).find('input[type=radio]:checked').val();
		currentInput = parseInt($(this).find(':checked').val());

		$(this).children('.rs-content').children().eq(currentInput).css('display', 'block');

		$(this).on('input[type=radio]').change(function () {
			currentInput = parseInt($(this).find(':checked').val());
			$(this).find('.rs-content').children().css('display', 'none');
			$(this).find('.rs-content').children().eq(currentInput).css('display', 'block');

		});
		var listChildNum = $(this).find('.rs-list').children().length;
		var contentChildNum = $(this).find('.rs-content > *').length;
		if (listChildNum !== contentChildNum) {
			$(this).prepend('<p style="font-weight:bold; font-style:italic; color:red;">Number of radio buttons does NOT match number of content items!</p>');
		}
	});
});

$(document).ready(function () {
	function togglePanelIcon(e) {
		$(e.target)
			.prev('.panel-heading')
			.find('.glyphicon')
			.toggleClass('glyphicon-plus-sign glyphicon-minus-sign');
	}
	$('.panel-collapse').on('hidden.bs.collapse', togglePanelIcon);
	$('.panel-collapse').on('shown.bs.collapse', togglePanelIcon);
});

$(document).ready(function () {
	$('.preprogram-note').each(function (noteCount) {
		var progNoteID = "pnote-" + noteCount;
		$(this).prepend('<div class="panel-heading"><h4 class="panel-title"><a href="#' + progNoteID + '" data-toggle="collapse">&lt;Programmer Note&gt;</a></h4></div>');
		$(this).addClass('panel');
		$(this).children('p').wrap('<div id="' + progNoteID + '" class="panel-collapse collapse"><div class="panel-body"></div></div>');
		$(this).removeClass('preprogram-note').addClass('programmer-note');
	});
});

$(document).ready(function () {
	$('.predrawing-question').each(function () {
		$(this).addClass('drawing-question').removeClass('predrawing-question');
	});

	var backgroundImg;
	var colors = [];
	var brushSizes = [];
	$('.pre-draw').each(function () {
		$(this).prepend('<div class="panel-body"></div>');
		$(this).children('p').wrap('<div></div>');
		$(this).removeClass('pre-draw').addClass('drawing-question');
	});
});

$(document).ready(function () {
	var moduleTitle = $('title').text();
	$('.module-title-text').html(moduleTitle);
});

$(document).ready(function () {
	$('#preassessment-message').prepend('<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="preassessment-label">Pre-Assessment</h4></div><div class="modal-body" id="module-preassessment-modal"><p>Before you begin, please complete a short pre-assessment by clicking the button below.<br><br>This pre-assessment covers material in the lesson that you are about to take, and it will help you gauge your current level of understanding of this topic. You will have the opportunity to take a quiz with very similar questions after you have completed the lesson. Comparing the two will help you see how much you’ve learned and will also help us see how well the lesson achieves its goals.</p></div>');

	$('#quiz-prompt').append('<div id="userQuiz" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="userquiz-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="userquiz-label">Quiz</h4></div><div class="modal-body" id="module-userquiz-modal"><p>If you are viewing this page from a downloaded version of the lesson, you will need to be connected to the Internet in order to access the quiz. If you haven’t logged in on MetEd or you need to create a MetEd account, you will be prompted to do so. Your progress in the quiz is saved each time you choose "Save Answer and Continue," even if you close your browser and continue at a later time. You may skip a question and return to it at any point. Once you have saved answers to all questions, your score is calculated and reported.</p><a href="http://www.meted.ucar.edu/about_external_lms.htm" target="_blank">Important note for NOAA, Air Force, and Navy LMS users!</a> </div><div class="modal-footer"> <a class="btn btn-default" href="https://meted.ucar.edu/education_training/lesson/' + moduleID + '/quiz" target="_blank">Go to the Quiz »</a> </div></div></div></div>');

	$('#quiz-prompt').append('<div id="userSurvey" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="usersurvey-label" aria-hidden="true"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title" id="usersurvey-label">User Survey</h4></div><div class="modal-body" id="module-usersurvey-modal"><p>We can’t improve without your help. Please let us know what you thought of this product. Your responses will help us create more effective instruction in the future. <br><br>Clicking the following link will take you to a short survey. If you are viewing this page from a downloaded version of the lesson, you will need to be connected to the Internet. If you haven’t logged in on MetEd or you need to create a MetEd account, you will be prompted to do so.</p></div><div class="modal-footer"> <a class="btn btn-default" href="https://meted.ucar.edu/education_training/lesson/' + moduleID + '/survey" target="_blank">Go to the user survey »</a> </div></div></div></div>');

	if (moduleID !== '0000') {
		$('#booster-link').attr('href', 'https://meted.ucar.edu/education_training/lesson/' + moduleID + '/booster');
	}
});