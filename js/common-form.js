'use strict'

/*
*	全局表单效验规则
*	identifier : 表单input name值
*	rules : 验证规则设置
*	username, userpassword等为自定义规则名称
*   prompt: {
		empty                : '{name} must have a value',
		checked              : '{name} must be checked',
		email                : '{name} must be a valid e-mail',
		url                  : '{name} must be a valid url',
		regExp               : '{name} is not formatted correctly',
		integer              : '{name} must be an integer',
		decimal              : '{name} must be a decimal number',
		number               : '{name} must be set to a number',
		is                   : '{name} must be \'{ruleValue}\'',
		isExactly            : '{name} must be exactly \'{ruleValue}\'',
		not                  : '{name} cannot be set to \'{ruleValue}\'',
		notExactly           : '{name} cannot be set to exactly \'{ruleValue}\'',
		contain              : '{name} cannot contain \'{ruleValue}\'',
		containExactly       : '{name} cannot contain exactly \'{ruleValue}\'',
		doesntContain        : '{name} must contain  \'{ruleValue}\'',
		doesntContainExactly : '{name} must contain exactly \'{ruleValue}\'',
		minLength            : '{name} must be at least {ruleValue} characters',
		length               : '{name} must be at least {ruleValue} characters',
		exactLength          : '{name} must be exactly {ruleValue} characters',
		maxLength            : '{name} cannot be longer than {ruleValue} characters',
		match                : '{name} must match {ruleValue} field',
		different            : '{name} must have a different value than {ruleValue} field',
		creditCard           : '{name} must be a valid credit card number',
		minCount             : '{name} must have at least {ruleValue} choices',
		exactCount           : '{name} must have exactly {ruleValue} choices',
		maxCount             : '{name} must have {ruleValue} or less choices'
	}
*/

//自定义开课时间效验方法
$.fn.form.settings.rules.minDate = function(value, identifier) {
	var $form = $(this),
		matchingValue
	if( $('[data-validate="'+ identifier +'"]').length > 0 ) {
	  matchingValue = $('[data-validate="'+ identifier +'"]').val();
	}
	else if($('#' + identifier).length > 0) {
	  matchingValue = $('#' + identifier).val();
	}
	else if($('[name="' + identifier +'"]').length > 0) {
	  matchingValue = $('[name="' + identifier + '"]').val();
	}
	else if( $('[name="' + identifier +'[]"]').length > 0 ) {
	  matchingValue = $('[name="' + identifier +'[]"]');
	}
	var starttime = new Date(matchingValue).getTime()
	var activetime = new Date(value).getTime()
	return (matchingValue !== undefined) ? ( starttime < activetime ) : false
}
$.fn.form.settings.rules.maxDate = function(value, identifier) {
	var $form = $(this),
		matchingValue
	if( $('[data-validate="'+ identifier +'"]').length > 0 ) {
	  matchingValue = $('[data-validate="'+ identifier +'"]').val();
	}
	else if($('#' + identifier).length > 0) {
	  matchingValue = $('#' + identifier).val();
	}
	else if($('[name="' + identifier +'"]').length > 0) {
	  matchingValue = $('[name="' + identifier + '"]').val();
	}
	else if( $('[name="' + identifier +'[]"]').length > 0 ) {
	  matchingValue = $('[name="' + identifier +'[]"]');
	}
	var starttime = new Date(matchingValue).getTime()
	var activetime = new Date(value).getTime()
	return (matchingValue !== undefined) ? ( starttime > activetime ) : false
}


//通用字段效验规则
var formFieldsRules = {
	empty: {
		identifier: 'empty',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入'
			},
		]
	},
	userName: {
		identifier: 'userName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入用户名'
			},
			{
				type   : 'minLength[6]',
				prompt : '用户名长度不少于6位'
			},
		]
	},
	userPassword: {
		identifier: 'userPassword',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入用户密码'
			},
			{
				type   : 'minLength[6]',
				prompt : '用户密码长度不少于6位'
			},
		]
	},
	userNewPassword: {
		identifier: 'userNewPassword',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入新用户密码'
			},
			{
				type   : 'minLength[6]',
				prompt : '用户密码长度不少于6位'
			},
		]
	},
	userComfirmPassword: {
		identifier: 'userComfirmPassword',
		rules: [
			{
				type   : 'empty',
				prompt : '请再次输入密码'
			},
			{
				type   : 'match[userNewPassword]',
				prompt : '输入密码与新密码不一致'
			},
		]
	},
	userAffirmPassword: {
		identifier: 'userAffirmPassword',
		rules: [
			{
				type   : 'empty',
				prompt : '请再次输入密码'
			},
			{
				type   : 'match[userPassword]',
				prompt : '两次输入密码不一致'
			},
		]
	},
	userRealName: {
		identifier: 'userRealName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入用户姓名'
			},
			{
				type   : 'minLength[2]',
				prompt : '请输入大于2位用户姓名'
			},
			{
				type   : 'regExp',
				value   : /^[\u4e00-\u9fa5]*$/,
				prompt : '用户姓名不规范'
			},
		]
	},
	userSex: {
		identifier: 'userSex',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择性别'
			},
		]
	},
	userSchool: {
		identifier: 'userSchool',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择学校'
			},
		]
	},
	userMajor: {
		identifier: 'userMajor',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择专业'
			},
		]
	},
	userTelphone: {
		identifier: 'userTelphone',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入手机号码'
			},
			{
				type   : 'length[11]',
				prompt : '请输入11位手机号码'
			},
			{
				type   : 'regExp',
				value   : /^1[0-9]{10}$/,
				prompt : '手机号码不规范'
			},
		]
	},
	userIdCode: {
		identifier: 'userIdCode',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入身份证号码'
			},
			{
				type   : 'regExp',
				value   : /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
				prompt : '身份证号码不规范'
			},
		]
	},
	userPostCode: {
		identifier: 'userPostCode',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入邮编'
			},
			{
				type   : 'regExp',
				value   : /^[0-9]{6}$/,
				prompt : '邮编不规范'
			},
		]
	},
	userEmail: {
		identifier: 'userEmail',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入邮箱'
			},
			{
				type   : 'email',
				prompt : '邮箱不规范'
			},
		]
	},
	userStudentNumber: {
		identifier: 'userStudentNumber',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入学号'
			},
			{
				type   : 'minLength[6]',
				prompt : '请输入大于6位学号'
			},
		]
	},
	userStudentClass: {
		identifier: 'userStudentClass',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择班级'
			},
		]
	},
}

//新建课程字段效验规则
var courseAddFieldsRules = {
	courseImage: {
		identifier: 'courseImage',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择课程封面'
			},
		]
	},
	courseName: {
		identifier: 'courseName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入课程名称'
			},
		]
	},
	courseTypes: {
		identifier: 'courseTypes',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择课程类型'
			},
		]
	},
	courseDateStart: {
		identifier: 'courseDateStart',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择开课时间'
			},
		]
	},
	courseDateEnd: {
		identifier: 'courseDateEnd',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择结课时间'
			},
			{
				type   : 'minDate[courseDateStart]',
				prompt : '结课时间要大于开课时间'
			}
		]
	},
	courseTeachingTime: {
		identifier: 'courseTeachingTime',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入授课时长'
			},
		]
	},
	courseResultsOperating: {
		identifier: 'courseResultsOperating',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入运营分数比例'
			},
		]
	},
	courseResultsAttendance: {
		identifier: 'courseResultsAttendance',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入考勤分数比例'
			},
		]
	},
	courseResultsHomework: {
		identifier: 'courseResultsHomework',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入作业分数比例'
			},
		]
	},
	courseResultsTest: {
		identifier: 'courseResultsTest',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入考试成绩比例'
			},
		]
	},
	courseResultsProfits: {
		identifier: 'courseResultsProfits',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入利润成绩比例'
			},
		]
	},
	courseResultsOtherName: {
		identifier: 'courseResultsOtherName',
		rules: [
			{
				type   : 'empty',
				prompt : '请填写设置比例名称'
			},
			{
				type   : 'regExp',
				value   : /^[\u4e00-\u9fa5]*$/,
				prompt : '设置比例请填写汉字'
			},
		]
	},
	courseResultsOtherValue: {
		identifier: 'courseResultsOtherValue',
		rules: [
			{
				type   : 'empty',
				prompt : '请填写设置比例'
			},
		]
	},
	courseSummarize: {
		identifier: 'courseSummarize',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入课程概述'
			},
		]
	},
	courseObjectives: {
		identifier: 'courseObjectives',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入教学目标'
			},
		]
	},
	courseInitialCapital: {
		identifier: 'courseInitialCapital',
		rules: [
			{
				type   : 'empty',
				prompt : '请设置初始资金'
			},
		]
	},
	courseInviteCode: {
		identifier: 'courseInviteCode',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入邀请码'
			},
		]
	},
}

//新建资源字段效验规则
var materialAddFieldsRules = {
	materialImage: {
		identifier: 'materialImage',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择资源图片'
			},
		]
	},
	materialName: {
		identifier: 'materialName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入资源名称'
			},
		]
	},
	materialTypes: {
		identifier: 'materialTypes',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择资源类型'
			},
		]
	},
	materialOpen: {
		identifier: 'materialOpen',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择是否对学生公开'
			},
		]
	},
}

//新建班级字段效验规则
var classAddFieldsRules = {
	className: {
		identifier: 'className',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入班级名称'
			},
		]
	},
	classSummarize: {
		identifier: 'classSummarize',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入班级概述'
			},
		]
	},
	classStudentName: {
		identifier: 'classStudentName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入学生姓名'
			},
		]
	},
	classStudentNumber: {
		identifier: 'classStudentNumber',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入学号'
			},
		]
	},
	classStudentMajor: {
		identifier: 'classStudentMajor',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入专业名称'
			},
		]
	},
	classReason: {
		identifier: 'classReason',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入调班原因'
			},
		]
	},
	fileobj: {
		identifier: 'fileobj',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择文件'
			},
		]
	},
}


//课程中心字段效验规则
var courseTaskFieldsRules = {
	teamgrouptype: {
		identifier: 'teamgrouptype',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择分组类型'
			},
		]
	},
	shtaskImage: {
		identifier: 'shtaskImage',
		rules: [
			{
				type   : 'empty',
				prompt : '请上传任务封面'
			},
		]
	},
	shtaskTime: {
		identifier: 'shtaskTime',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入任务时长'
			},
		]
	},
	shtaskSummarize: {
		identifier: 'shtaskSummarize',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入任务描述'
			},
		]
	},
	shtaskJobs: {
		identifier: 'shtaskJobs',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择任务对应岗位'
			},
		]
	},
	shtaskReply: {
		identifier: 'shtaskReply',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择是否需要回复'
			},
		]
	},
	shtaskUploadfile: {
		identifier: 'shtaskUploadfile',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择是否需要上传文件'
			},
		]
	},
	shtaskMaterial: {
		identifier: 'shtaskMaterial',
		rules: [
			{
				type   : 'empty',
				prompt : '请绑定素材资源'
			},
		]
	},
	shtaskMaterialselect: {
		identifier: 'shtaskMaterialselect',
		rules: [
			{
				type   : 'checked',
				prompt : '未选择任何素材资源'
			},
		]
	},
	shtaskComment: {
		identifier: 'shtaskComment',
		rules: [
			{
				type   : 'empty',
				prompt : '请填写评语'
			},
		]
	},
	shtaskScore: {
		identifier: 'shtaskScore',
		rules: [
			{
				type   : 'empty',
				prompt : '请填写分数'
			},
		]
	},
}


//考试中心题库字段效验规则
var courseQuestionFieldsRules = {
	shExamQuestionName: {
		identifier: 'shExamQuestionName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入题干名称'
			},
		]
	},
	shExamQuestionChapter: {
		identifier: 'shExamQuestionChapter',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择课程章节'
			},
		]
	},
	shExamQuestionPeriod: {
		identifier: 'shExamQuestionPeriod',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择课时'
			},
		]
	},
	shExamQuestionType: {
		identifier: 'shExamQuestionType',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择题型'
			},
		]
	},
	//单选配置
	shExamQuestionRadioCorrect: {
		identifier: 'shExamQuestionRadioCorrect',
		depends: 'ExamQuestionRadioActive',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择正确答案'
			},
		]
	},
	shExamQuestionRadioOptionTitleA: {
		identifier: 'shExamQuestionRadioOptionTitleA',
		depends: 'ExamQuestionRadioActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionRadioOptionTitleB: {
		identifier: 'shExamQuestionRadioOptionTitleB',
		depends: 'ExamQuestionRadioActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionRadioOptionTitleC: {
		identifier: 'shExamQuestionRadioOptionTitleC',
		depends: 'ExamQuestionRadioActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionRadioOptionTitleD: {
		identifier: 'shExamQuestionRadioOptionTitleD',
		depends: 'ExamQuestionRadioActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	//多选配置
	shExamQuestionCheckboxCorrect: {
		identifier: 'shExamQuestionCheckboxCorrect',
		depends: 'ExamQuestionCheckboxActive',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择正确答案'
			},
		]
	},
	shExamQuestionCheckboxOptionTitleA: {
		identifier: 'shExamQuestionCheckboxOptionTitleA',
		depends: 'ExamQuestionCheckboxActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionCheckboxOptionTitleB: {
		identifier: 'shExamQuestionCheckboxOptionTitleB',
		depends: 'ExamQuestionCheckboxActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionCheckboxOptionTitleC: {
		identifier: 'shExamQuestionCheckboxOptionTitleC',
		depends: 'ExamQuestionCheckboxActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionCheckboxOptionTitleD: {
		identifier: 'shExamQuestionCheckboxOptionTitleD',
		depends: 'ExamQuestionCheckboxActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	//判断配置
	shExamQuestionJudgeCorrect: {
		identifier: 'shExamQuestionJudgeCorrect',
		depends: 'ExamQuestionJudgeActive',
		rules: [
			{
				type   : 'checked',
				prompt : '请选择正确答案'
			},
		]
	},
	shExamQuestionJudgeOptionTitleA: {
		identifier: 'shExamQuestionJudgeOptionTitleA',
		depends: 'ExamQuestionJudgeActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	shExamQuestionJudgeOptionTitleB: {
		identifier: 'shExamQuestionJudgeOptionTitleB',
		depends: 'ExamQuestionJudgeActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入标题'
			},
		]
	},
	//简答配置
	shExamQuestionShortAnswer: {
		identifier: 'shExamQuestionShortAnswer',
		depends: 'ExamQuestionShortActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入参考答案'
			},
		]
	},
	//论述配置
	shExamQuestionPaperAnswer: {
		identifier: 'shExamQuestionPaperAnswer',
		depends: 'ExamQuestionPaperActive',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入参考答案'
			},
		]
	},
}

//考试中心试卷字段效验规则
var coursePaperFieldsRules = {
	shExamPaperName: {
		identifier: 'shExamPaperName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入试卷名称'
			},
		]
	},
	shExamPaperTime: {
		identifier: 'shExamPaperTime',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入答题时间限制'
			},
		]
	},
	shExamPaperTimeDate: {
		identifier: 'shExamPaperTimeDate',
		rules: [
			{
				type   : 'empty',
				prompt : '选择截止交卷时间'
			},
		]
	},
	//单选配置
	shExamPaperRadioQuestionIds: {
		identifier: 'shExamPaperRadioQuestionIds',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择题目'
			},
		]
	},
	shExamPaperRadioQuestionScore: {
		identifier: 'shExamPaperRadioQuestionScore',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入每题分值'
			},
		]
	},
	//多选配置
	shExamPaperCheckboxQuestionIds: {
		identifier: 'shExamPaperCheckboxQuestionIds',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择题目'
			},
		]
	},
	shExamPaperCheckboxQuestionScore: {
		identifier: 'shExamPaperCheckboxQuestionScore',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入每题分值'
			},
		]
	},
	//判断配置
	shExamPaperJudgeQuestionIds: {
		identifier: 'shExamPaperJudgeQuestionIds',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择题目'
			},
		]
	},
	shExamPaperJudgeQuestionScore: {
		identifier: 'shExamPaperJudgeQuestionScore',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入每题分值'
			},
		]
	},
}



//考试中心作业字段效验规则
var courseHomeWorkFieldsRules = {
	shExamHomeWorkName: {
		identifier: 'shExamHomeWorkName',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入作业标题'
			},
		]
	},
	shExamHomeWorkTimeDate: {
		identifier: 'shExamHomeWorkTimeDate',
		rules: [
			{
				type   : 'empty',
				prompt : '选择作业截止时间'
			},
		]
	},
	shExamHomeWorkCharpter: {
		identifier: 'shExamHomeWorkCharpter',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择章节'
			},
		]
	},
	shExamHomeWorkPeriod: {
		identifier: 'shExamHomeWorkPeriod',
		rules: [
			{
				type   : 'empty',
				prompt : '请选择课时'
			},
		]
	},
	shExamHomeWorkContent: {
		identifier: 'shExamHomeWorkContent',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入作业内容'
			},
		]
	},
	shExamHomeWorkAttachment: {
		identifier: 'shExamHomeWorkAttachment',
		rules: [
			{
				type   : 'empty',
				prompt : '请上传附件'
			},
		]
	},
	shExamHomeWorkScore: {
		identifier: 'shExamHomeWorkScore',
		rules: [
			{
				type   : 'empty',
				prompt : '请输入分值'
			},
		]
	},
}



var formFields = $.extend(
	formFieldsRules, 
	courseAddFieldsRules, 
	classAddFieldsRules, 
	materialAddFieldsRules, 
	courseTaskFieldsRules, 
	courseQuestionFieldsRules,
	coursePaperFieldsRules,
	courseHomeWorkFieldsRules,
)

var formOptions = {
	on: 'blur',
	inline: true,
	fields: formFields,
	onValid: function(field){
		$(this).parents('.field').addClass('success')
	},
	onSuccess: function(event,fields) {
		if(!$(this).attr('action')){
			event && event.preventDefault()
		}
	},
	onFailure: function(formErrors, fields){
		//可根据此处错误进行滚动条跳转
		var errarr = []
		for(var k in fields){
			if($("input[name="+k+"]").parents('.field').hasClass('error')){
				errarr.push(k)
			}
		}
		$("input[name="+errarr[0]+"]").length > 0 ? sh.scrollTo($("input[name="+errarr[0]+"]").offset().top-50) : ''
		return false
	}
}

//表单提交进行
$(".ui.form").form(formOptions)
