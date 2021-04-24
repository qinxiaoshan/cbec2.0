'use strict'
/*
*	全局封装规则
*/
var sh = (function(document) {
	var _self = {};
	
	
	/**
	* 消息框
	* 二次封装sweetalert方法
	* type: info error success warning
	*/
	//为全局swal进行默认配置， 优化样式
	var swaloption = {
		title: '提示',
		width: '300px',
		padding: '10',
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		confirmButtonClass: 'ui button primary large',
		cancelButtonClass: 'ui button large',
		showCloseButton: false,
		showCancelButton: false,
		buttonsStyling: false,
		allowOutsideClick: false,
	}
	_self.alert = function(options) {
		return swal(options)
	};
	_self.alert.info = function(message) {
		return swal({
			text: message,
			type: 'info'
		})
	};
	_self.alert.error = function(message) {
		return swal({
			text: message,
			type: 'error'
		})
	};
	_self.alert.success = function(message) {
		return swal({
			text: message,
			type: 'success'
		})
	};
	_self.alert.warning = function(message) {
		return swal({
			text: message,
			type: 'warning'
		})
	};
	_self.alert.question = function(message) {
		return swal({
			text: message,
			type: 'question'
		})
	};
	_self.alert.deletetip = function(title,message) {
		return swal({
			text: message,
			width: '360px',
			customClass: "deleteSuccess",
			// imageUrl: "../../../../teachv2/img/right.png",
			imageUrl: "../../../img/right.png",
			title: title,
			confirmButtonText: "关闭",
			confirmButtonClass: 'ui button orange large',
		})
	};
	_self.confirm = function(options){
		var confirmoptions = {
			showCancelButton: true,
		}
		var noptions = $.extend(confirmoptions, options)
		return swal(noptions)
	};
	_self.alert.confirmtip = function(options) {
		var confirmoptions = {
			showCancelButton: true,
			width: '360px',
			customClass: "confirmTip",
			// imageUrl: "../../../../teachv2/img/right.png",
			imageUrl: "../../../img/confirm.png",
			confirmButtonClass: 'ui button orange large',
		}
		var noptions = $.extend(confirmoptions, options)
		return swal(noptions)
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	* 通知框
	* 二次封装notifications方法
	* type: default error warning success info
	*/
	//为全局notify进行默认配置， 优化样式
	var notificationsoption = {
		rounded: false,
		delayIndicator: true,
		msg: '',
		title: '',
		sound: '',
		icon: 'comment icon',
	}
	_self.notify = function(soptions) {
		var options = $.extend(notificationsoption, soptions)
		return Lobibox.notify('default', options);
	};
	_self.notify.info = function(title,message) {
		var soptions = {title,message,icon:'info circle icon'}
		var options = $.extend(notificationsoption, soptions)
		return Lobibox.notify('info', options);
	};
	_self.notify.error = function(title,message) {
		var soptions = {title,message,icon:'remove icon'}
		var options = $.extend(notificationsoption, soptions)
		return Lobibox.notify('error', options);
	};
	_self.notify.success = function(title,message) {
		var soptions = {title,message,icon:'checkmark icon'}
		var options = $.extend(notificationsoption, soptions)
		return Lobibox.notify('success', options);
	};
	_self.notify.warning = function(title,message) {
		var soptions = {title,message,icon:'warning sign icon'}
		var options = $.extend(notificationsoption, soptions)
		return Lobibox.notify('warning', options);
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	
	
	/**
	* 消息框
	* 二次封装message方法
	* type: loading error warning success info
	*/
	//为全局notify进行默认配置， 优化样式
	var messageconfig = {
		showClose:true,			//是否显示关闭图标
		timeout:4000,			//多久后自动关闭，单位ms
		autoClose:true,			//是否自动关闭
		html:false,				//是否将内容作为html渲染
		maxNums:5,				//最多显示消息(autoClose:true)的数量
	}
	_self.message = function(message, soptions) {
		var options = $.extend(messageconfig, soptions)
		return Qmsg.info(message, options);
	};
	_self.message.warning = function(message, soptions) {
		var options = $.extend(messageconfig, soptions)
		return Qmsg.warning(message, options);
	};
	_self.message.error = function(message, soptions) {
		var options = $.extend(messageconfig, soptions)
		return Qmsg.error(message, options);
	};
	_self.message.success = function(message, soptions) {
		var options = $.extend(messageconfig, soptions)
		return Qmsg.success(message, options);
	};
	_self.message.loading = function(message, soptions) {
		var options = $.extend(messageconfig, soptions)
		return Qmsg.loading(message, options);
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	
	
	/**
	* 全局滚动条滚动到指定位置
	* x 滚动条横轴
	* y 滚动条纵轴
	* anim 滚动时间默认为300
	*/
	_self.scrollTo = function(scrollTop,duration,callback){
		duration = duration || 300;
		$('html,body').stop().animate({
			scrollTop: scrollTop
		},duration, callback)
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	
	
	/**
	* 全局复制文本方法
	*/
	_self.copytext = function(text,callback){
		const inputcopy = document.createElement('input');
		document.body.appendChild(inputcopy);
		inputcopy.setAttribute('value', text);
		inputcopy.select();
		if (document.execCommand('copy')) {
			document.execCommand('copy');
			sh.message.success("复制成功")
			callback && callback({
				status: 'success'
			})
		}else{
			sh.message.error("复制失败")
			callback && callback({
				status: 'error'
			})
		}
		inputcopy.remove()
	};
	//////////////////////////////////////////////////////////////////////////////////////////
	
	
	/*
	*	全局富文本编辑器规则
	*	identifier : 表单input name值
	*	rules : 验证规则设置
	*	username, userpassword等为自定义规则名称
	*/
	var tinymceoptions = {
		branding: false,  // 隐藏富文本编辑器组件的商标消息” Powered by TinyMCE”
		plugins: "code ax_wordlimit print preview searchreplace autolink directionality visualblocks visualchars fullscreen \
			image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist \
			lists wordcount imagetools textpattern help emoticons autosave autoresize",
		toolbar: "code undo redo restoredraft | \
			forecolor backcolor bold italic underline strikethrough link anchor lineheight | \
			alignleft aligncenter alignright alignjustify outdent indent | \
			bullist numlist | \
			blockquote subscript superscript removeformat | \
			fullscreen | \
			table image media charmap emoticons hr pagebreak insertdatetime print preview | \
			styleselect formatselect fontselect fontsizeselect",
		fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
		min_height: 400,
		language:'zh_CN',
		// selector: '#tinymcetextarea',
		// ax_wordlimit_num: 40,
		// ax_wordlimit_callback: function(editor,txt,num){
		// 	console.warn('当前字数：' + txt.length + '，限制字数：' + num);
		// }
	}
	_self.tinymce = function(dom,fireoptions){
		fireoptions = fireoptions || {}
		fireoptions.selector = dom
		var options = $.extend(tinymceoptions, fireoptions)
		return tinymce.init(options)
	}
    //////////////////////////////////////////////////////////////////////////////////////////
   
   
	/*
	*	全局数据表格规则
	*/
	var datatableconfig = {
		pageLength: 10,
		info: true,						//控制是否显示表格左下角的信息
		ordering: true,					//是否允许Datatables开启排序
		paging: true,					//是否开启本地分页
		processing: true,				//是否显示处理状态(排序的时候，数据很多耗费时间长的话，也会显示这个)
		scrollX: false,
		// scrollY: "200px",
		scrollCollapse: false,
		serverSide: false,				//保存状态 - 在页面重新加载的时候恢复状态（页码等内容）
		stateSave: true,				//是否开启服务器模式
		deferRender: true,				//控制Datatables的延迟渲染，可以提高初始化的速度
		searching: true,
		lengthChange: true,
		bLengthChange: true,
		aLengthMenu: [10,20,30,50],
		language: {
			sProcessing: "处理中...",
			sLengthMenu: "显示 _MENU_ 项结果",
			sZeroRecords: "没有匹配结果",
			sInfo: "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
			sInfoEmpty: "",
			sInfoFiltered: "",
			sInfoPostFix: "",
			sSearch: "搜索:",
			sUrl: "",
			sEmptyTable: "暂无数据",
			sLoadingRecords: "载入中...",
			sInfoThousands: ",",
			oPaginate: {
				sFirst: "首页",
				sPrevious: "上页",
				sNext: "下页",
				sLast: "末页"
			},
			oAria: {
				"sSortAscending": ": 以升序排列此列",
				"sSortDescending": ": 以降序排列此列"
			}
		},
	}
	_self.datatable = function(dom,tableoptions){
		var $dom = $(dom) || dom
		if(!$dom.length){
			return false
		}
		tableoptions = tableoptions || {}
		tableoptions.selector = dom
		var options = $.extend(datatableconfig, tableoptions)
		return $dom.DataTable(options)
	}
    //////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局日期插件规则
	*/
	var datepickerconfig = {
		theme:{ bgcolor:"#00b5ad" },
		format:"YYYY-MM-DD hh:mm:ss",
	}
	_self.datepicker = function(dom,datepickeroptions){
		datepickeroptions = datepickeroptions || {}
		var $dom = $(dom) || dom
		if(!$dom.length){
			return false
		}
		var jedateArr = []
		$dom.each(function(k,item){
			var itemformat = $(item).attr('data-format') || 'YYYY-MM-DD'
			datepickerconfig.donefun = function(){
				$(item).trigger('blur')
			}
			datepickeroptions.format = itemformat
			var options = $.extend(datepickerconfig, datepickeroptions)
			var jedate = jeDate(this,options)
			jedateArr.push(jedate)
		})
		return jedateArr
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局分页器规则
	*/
	var pageconfig = {
		current: 1,
		pagesize : 10,		//每页显示多少条
		count : 1,			//总数
		prevTpl: "上一页",
		nextTpl: "下一页",
		firstTpl: "首页",
		lastTpl: "末页",
		ellipseTpl: "...",		//省略号的模板
		toolbar: false,
		pageSizeList: [5,10,15,20]
	}
	_self.page = function(fatherdom,childdom,pageoptions){
		pageoptions = pageoptions || {}
		if(!fatherdom){
			return false
		}
		var pageArr = []
		$(fatherdom).each(function(fak,faitem){
			var pageid = $(faitem).parent().find('.sh_page_container')
			var pagelists = 0
			var pagesize = pageid.attr('data-pagesize')
			var pagesizelist = pageid.attr('data-pagesizelist')
			var pagetoolbar = pageid.attr('data-toolbar')
			var pagelink = pageid.attr('data-link')		//是否为 link模式跳转
			var pagechild
			if(childdom){
				pagechild = $(faitem).find(childdom)
			}else{
				pagechild = $(faitem).children()
			}
			pagelists = pagechild.length
			pagesize ? pageoptions.pagesize = pagesize : ''
			pagesizelist ? pageoptions.pageSizeList = pagesizelist : ''
			pagetoolbar != undefined ? pageoptions.toolbar = true : ''
			pageoptions.count = pagelists
			if(pagelink != undefined){
				var hashcurrent = window.location.hash.replace('#page=','')
				if(hashcurrent > 1){
					if(hashcurrent*pagesize > pagelists){
						//如果跳转分页超出条数，则回到第一页显示
						window.location.href = window.location.pathname + window.location.search + '#page='+1
						window.location.reload()
						return false
					}
					pageoptions.current = hashcurrent
				}
			}
			pageoptions.callback = function(page,size,count){
				if(pagelink != undefined){
					window.location.href = window.location.pathname + window.location.search + '#page='+page
					window.location.reload()
					return false
				}
				pagechild.addClass('sh_hidden')
				for (var i=0; i<size; i++) {
					var showindex = i + (page-1)*size
					pagechild.eq(showindex).removeClass('sh_hidden')
				}
			}
			pageoptions.changePagesize = function(ps){
				if(ps > pagelists){
					pagechild.removeClass('sh_hidden')
					window.location.href = window.location.pathname + window.location.search + '#page='+1
					return false
				}
				pagechild.addClass('sh_hidden')
				for (var i=0; i<ps; i++) {
					var showindex = i + (options.current-1)*ps
					console.log(showindex)
					pagechild.eq(showindex).removeClass('sh_hidden')
				}
			}
			var options = $.extend(pageconfig, pageoptions)
			//根据分液器隐藏不需要显示部分
			pagechild.addClass('sh_hidden')
			for (var i=0; i<options.pagesize; i++) {
				var showindex = i + (options.current-1)*options.pagesize
				pagechild.eq(showindex).removeClass('sh_hidden')
			}
			if(pagelists == 0){
				pageid.hide()
			}
			var pageitem = pageid.Paging(options);
			pageArr.push(pageitem)
		})
		return pageArr
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局html转为文件方法
	*/
	_self.htmlToWord = function(dom, fileName){
		var $dom = $(dom) || dom
		if(!$dom.length){
			return false
		}
		fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
		var filestatictop = 'xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" xmlns:w=\"urn:schemas-microsoft-com:office:word\" xmlns:m=\"http://schemas.microsoft.com/office/2004/12/omml\" xmlns=\"http://www.w3.org/TR/REC-html40\"'
		var filestatichead = '<!--[if gte mso 9]><xml><w:WordDocument><w:View>Print</w:View><w:TrackMoves>false</w:TrackMoves><w:TrackFormatting/><w:ValidateAgainstSchemas/><w:SaveIfXMLInvalid>false</w:SaveIfXMLInvalid><w:IgnoreMixedContent>false</w:IgnoreMixedContent><w:AlwaysShowPlaceholderText>false</w:AlwaysShowPlaceholderText><w:DoNotPromoteQF/><w:LidThemeOther>EN-US</w:LidThemeOther><w:LidThemeAsian>ZH-CN</w:LidThemeAsian><w:LidThemeComplexScript>X-NONE</w:LidThemeComplexScript><w:Compatibility><w:BreakWrappedTables/><w:SnapToGridInCell/><w:WrapTextWithPunct/><w:UseAsianBreakRules/><w:DontGrowAutofit/><w:SplitPgBreakAndParaMark/><w:DontVertAlignCellWithSp/><w:DontBreakConstrainedForcedTables/><w:DontVertAlignInTxbx/><w:Word11KerningPairs/><w:CachedColBalance/><w:UseFELayout/></w:Compatibility><w:BrowserLevel>MicrosoftInternetExplorer4</w:BrowserLevel><m:mathPr><m:mathFont m:val=\"Cambria Math\"/><m:brkBin m:val=\"before\"/><m:brkBinSub m:val=\"--\"/><m:smallFrac m:val=\"off\"/><m:dispDef/><m:lMargin m:val=\"0\"/> <m:rMargin m:val=\"0\"/><m:defJc m:val=\"centerGroup\"/><m:wrapIndent m:val=\"1440\"/><m:intLim m:val=\"subSup\"/><m:naryLim m:val=\"undOvr\"/></m:mathPr></w:WordDocument></xml><![endif]-->'
		var filestatic = {
			mhtml: {
				top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html "+filestatictop+">\n_html_</html>",
				head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">"+filestatichead+"\n<style>\n_styles_\n</style>\n</head>\n",
				body: "<body>_body_</body>"
			}
		};
		var options = {
			maxWidth: 624
		};
		var markup = $dom.clone();
		markup.each(function () {
			var self = $(this);
			if (self.is(':hidden'))
				self.remove();
			self.find('.ui.hidden').remove();
			self.find('.sh_hidden').remove();
		});
		console.log(markup.text())
		if((markup.text() == '' && markup.find('img').length == 0) || markup.length == 0) return false
		var images = Array();
		var img = markup.find('img');
		for (var i = 0; i < img.length; i++) {
			var w = Math.min(img[i].width, options.maxWidth);
			var h = img[i].height * (w / img[i].width);
			// var img_id = "#"+img[i].id;
			// $('<canvas>').attr("id", "test_word_img_" + i).width(w).height(h).insertAfter(img_id);
			// Create canvas for converting image to data URL
			var canvas = document.createElement("CANVAS");
			canvas.width = w;
			canvas.height = h;
			var context = canvas.getContext('2d');
			context.drawImage(img[i], 0, 0, w, h);
			try{
				var uri = canvas.toDataURL("image/png/jpg");
				$(img[i]).attr("src", img[i].src);
				img[i].width = w;
				img[i].height = h;
				images[i] = {
					type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
					encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
					location: $(img[i]).attr("src"),
					data: uri.substring(uri.indexOf(",") + 1)
				};
			}catch(e){
				//TODO handle the exception
				console.warn(e)
				if(String(e).indexOf('Tainted canvases may not be exported') != -1){
					_self.alert.error('内容含有外网图片,导出将丢失!')
				}
			}
		}
		var mhtmlBottom = "\n";
		for (var i = 0; i < images.length; i++) {
			mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
			mhtmlBottom += "Content-Location: " + images[i].location + "\n";
			mhtmlBottom += "Content-Type: " + images[i].type + "\n";
			mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
			mhtmlBottom += images[i].data + "\n\n";
		}
		mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";
		
		var styles = "";
		var fileContent = filestatic.mhtml.top.replace("_html_", filestatic.mhtml.head.replace("_styles_", styles) + filestatic.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

		var blob = new Blob([fileContent], {
			type: "application/msword;charset=utf-8"
		});
		saveAs(blob, fileName + '.docx');
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局canvas画板创建
	*/
	var canvasconfig = {
		width: '100%',
		height: '400px',
		lineWidth: 5,
		signatureLine: false,	//去除默认画布上那条横线
		cssclass: 'sh_canvas',
	}
	_self.canvas = function(dom, canvasoptions){
		var _thiscanvas = {}
		var $dom = $(dom) || dom
		canvasoptions = canvasoptions || {}
		var domwidth = $dom.width()
		var domheight = $dom.height()
		canvasoptions.width = domwidth
		canvasoptions.height = domheight
		var options = $.extend(canvasconfig, canvasoptions)
		if(!$dom.length){
			return false
		}
		_thiscanvas.init = function(){
			return $dom.jSignature(options)
		}
		_thiscanvas.save = function(callback){
			return $dom.jSignature('getData') && callback && callback($dom.jSignature('getData'))
		}
		_thiscanvas.clear = function(callback){
			return $dom.jSignature('reset') && callback && callback($dom.jSignature('reset'))
		}
		_thiscanvas.init()
		return _thiscanvas
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局upload上传组件封装
	*/
	var uploadconfig = {
		swf: '../plugins/webuploader/Uploader.swf',
		resize: false,
		size: 2,	//以M为单位
	}
	_self.uploadimg = function(dom, uploadoptions, callback){
		var $dom = $(dom) || dom
		uploadoptions = uploadoptions || {}
		uploadoptions.accept = {
		    title: "Images",
			mimeTypes: '.gif,.jpg,.jpeg,.png'//mime类型
		}
		if(!$dom.length){
			return false
		}
		var options = $.extend(uploadconfig, uploadoptions)
		var _thisupload = WebUploader.create(options)
		var _thisuploadimg = $dom.find('.sh_upload_img')
		var state = "pending"
		var $uploadbtn = $(options.uploadbtn)
		_thisupload.on('fileQueued', function(file) {
			var filetype = file.ext
			var filesize = file.size
			if(options.accept.mimeTypes.indexOf(filetype) == -1){
				_self.alert.error('文件格式不正确,请重新上传！')
				return false
			}
			if(filesize > options.size*1024*1024){
				_self.alert.error('文件大小超出2M,请重新上传！')
				return false
			}
			$dom.find('.sh_upload_list').empty()
			$dom.find('.sh_upload_list').append('<div id="' + file.id + '" class="sh_upload_list_item">' +
		            '<h4 class="info">' + file.name + '</h4>' +
		            '<p class="state">等待上传...</p>' +
		        '</div>' );
			_thisupload.makeThumb( file, function( error, src ) {
				if ( error ) {
					_thisuploadimg.replaceWith('<div>不能预览</div>');
					return;
				}
				_thisuploadimg.attr( 'src', src );
			});
		});
		_thisupload.on('uploadProgress', function( file, percentage ) {
		    var $li = $( '#'+file.id ),
		        $percent = $li.find('.ui.progress'),
				$loader = $dom.find('.ui.loader')
		    // 避免重复创建
		    if ( !$percent.length ) {
		        $percent = $('<div data-value="0" data-total="100" class="ui small teal active progress"><div class="bar"></div></div>').appendTo( $li ).find('.ui.progress');
		    }
			if ( !$loader.length ) {
			    $loader = $('<div class="ui inverted dimmer active"><div class="ui text loader">上传中...</div></div>').prependTo(dom)
			}
		    $li.find('p.state').text('上传中');
		    $loader.find('.ui.load').text(percentage * 100 + '%');
		    $percent.attr('data-value', percentage * 100);
		    $percent.progress({
				duration : 200,
				text: {
					ratio: '{value}%'
				}
			})
		});
		_thisupload.on("uploadSuccess", function(file, res) {
			$('#' + file.id).find('p.state').text('上传成功');
			setTimeout(function(){
				$('#' + file.id).fadeOut(200).remove();
				$dom.find('.ui.loader').parent().remove();
				_thisupload.reset();
				_thisupload.refresh();
				callback && callback({
					status: 'success',
					res: res,
					file: file,
				})
			},300)
		})
		_thisupload.on("uploadError", function(file, err) {
			$('#' + file.id).find('p.state').text('上传失败');
			setTimeout(function(){
				$dom.find('.ui.loader').parent().remove();
				_thisupload.reset();
				_thisupload.refresh();
				callback && callback({
					status: 'error',
					res: err,
					file: file,
				})
			},300)
		})
		_thisupload.on("uploadComplete", function(file) {
		})
		//只允许上传一个，每次文件加入队列前触发
		_thisupload.on('beforeFileQueued',function(){
			_thisupload.refresh();
		});
		_thisupload.on("all", function(type) {
			if (type === 'startUpload') {
				state = 'uploading';
			} else if (type === 'stopUpload') {
				state = 'paused'
			} else if (type === 'uploadFinished') {
				state = 'done'
			}
			if (type === 'uploading') {
				$uploadbtn.text('暂停上传')
			} else {
				$uploadbtn.text('开始上传')
			}
		})
		$uploadbtn.click(function(){
			if (state === 'uploading') {
				_thisupload.stop();
			} else {
				_thisupload.upload();
				state="done"
			}
		})
		return _thisupload
	}
	//////////////////////////////////////////////////////////////////////////////////////////
	
	/*
	*	全局loader加载器封装
	*/
	var loaderconfig = {
		template: '<div class="ui inverted dimmer active"><div class="ui text loader"></div></div>',
		text: '加载中...',
	}
	_self.loader = function(dom, loaderoptions){
		loaderoptions = loaderoptions || {}
		var options = $.extend(loaderconfig, loaderoptions)
		var $dom = $(dom) || dom
		if(!$dom.length){
			return false
		}
		var $loader = $dom.find('.ui.loader')
		// 避免重复创建
		if ( !$loader.length ) {
		    $loader = $(options.template).prependTo(dom).show().find('.ui.loader').text(options.text)
		}
		return $loader
	}
	_self.loaderclose = function(dom){
		var $dom = $(dom) || dom
		if(!$dom.length){
			$('.ui.loader').parent().remove()
			return false
		}
		$dom.find('.ui.loader').parent().remove()
		return true
	}
	//////////////////////////////////////////////////////////////////////////////////////////
   
    //dom加载完成
	$(document).ready(function(){
		//为全局chart进行颜色配置
		window.chartcolor = ["#2bcbea","#ffae33",'#fc8452','#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
		
		//为全局swal进行默认配置， 优化样式
		swal.setDefaults(swaloption)
		
		//赋值到默认自定义类
		if($('.sh_tinymce').length > 0) _self.sh_tinymce = sh.tinymce('.sh_tinymce')
		if($('.sh_datatable').length > 0) _self.sh_datatable = sh.datatable('.sh_datatable')
		if($('.sh_datatable2').length > 0) _self.sh_datatable = sh.datatable('.sh_datatable2',{
			ordering: false,
			searching: false,
			bLengthChange: false,
		})
		if($('.sh_datatable3').length > 0) _self.sh_datatable = sh.datatable('.sh_datatable3',{
			ordering: false,
			searching: false,
			bLengthChange: false,
			info: false,
			paging: false,
			scrollX: false,
			scrollY: "200px",
		})
		if($('.sh_datatable4').length > 0) _self.sh_datatable = sh.datatable('.sh_datatable4',{
			order: [],
			ordering: true,
			searching: false,
			bLengthChange: false,
		})
		if($('.sh_datepicker').length > 0) _self.sh_datepicker = sh.datepicker('.sh_datepicker')
		if($('.sh_page_list').length > 0) _self.page = sh.page('.sh_page_list')
		
		//默认菜单选项卡
		$('.ui.menu').find('a.item').on('click', function () {
			$(this).parents('.ui.menu').find('.item').removeClass('active');
			$(this).addClass('active').siblings().removeClass('active');
			var routerhref = $(this).attr('data-router')
			if(routerhref != undefined){
				$("iframe.mainwrapiframe").attr('src', routerhref)
			}
		})
		
		//返回上一页
		$(document).on('click',".sh_routerback",function(e){
			window.history.back();
			return false
		})
		
		//主框架侧边栏进行iframe内容跳转
		
		
		//Rating显示
		$(".ui.rating").rating(); //rating trigger
		$('.ui.rating.disable').rating('disable');//disable rating trigger
		
		//全局字段进行去除空格
		$(document).on('blur',"input:not([type=file],[type=hidden],[readonly],[disabled])",function(e){
			var _thisval = $(this).val()
			var gmaxlength = $(this).attr('maxlength') ? $(this).attr('maxlength') : 20
			$(this).val($.trim(_thisval).slice(0,gmaxlength))
		})
		$(document).on('blur',"textarea:not([readonly],[disabled])",function(e){
			var _thisval = $(this).val()
			var gmaxlength = $(this).attr('maxlength') ? $(this).attr('maxlength') : 20
			$(this).val($.trim(_thisval).slice(0,gmaxlength))
		})
		
		// 自定义numberinput数字输入框 全局通用
		// 数字加
		$(document).on('click',".ui.plus",function(e){
			var inputnumber = $(this).parents('.input').find('input[type=number]')
			var max = inputnumber[0].max ? inputnumber[0].max : Infinity;
			var step = inputnumber.attr('data-step') ? Number(inputnumber.attr('data-step')) : 1
			inputnumber.val(function(i,v){
				var renum
				if(max){if (Number(v) >= max){renum = max}else{(Number(v)+step) >= max ? renum = max : renum = Number(v)+step}
				}else{renum = Number(v)+step;}
				return renum
			})
		})
		// 数字减
		$(document).on('click',".ui.minus",function(e){
			var inputnumber = $(this).parents('.input').find('input[type=number]')
			var min = inputnumber[0].min ? inputnumber[0].min : -Infinity;
			var step = inputnumber.attr('data-step') ? Number(inputnumber.attr('data-step')) : 1
			inputnumber.val(function(i,v){
				var renum
				if(min){if(Number(v) <= min){ renum = min }else{ (Number(v)-step) <= min ? renum = min : renum = Number(v)-step}
				}else{if(Number(v) < step){ renum = 0 }else{ renum = Number(v)-step; }}
				return renum
			})
		})
		//数字框手动输入
		$(document).on('blur',"input[type=number]",function(e){
			var _thisval = $(this).val()
			var _thisvalnum = Number(_thisval)
			var _thisnumtype = $(this).attr("data-number");
			var numberreg = /^[0-9]+.?[0-9]*$/
			var max = $(this).attr('max') ? Number($(this).attr('max')) : Infinity;
			var min = $(this).attr('min') ? Number($(this).attr('min')) : -Infinity;
			if(!numberreg.test(_thisval)){
				$(this).val('')
				return false
			}
			if(_thisvalnum >= min && _thisvalnum <= max){
				if(_thisnumtype=='int'){
					$(this).val('')
					$(this).val(parseFloat(_thisval).toFixed(0))
				}
			}else if(_thisvalnum > max){
				$(this).val(max)
			}else if(_thisvalnum < min){
				$(this).val(min)
			}else{
				$(this).val()
			}
		})
		//为所有输入框增加小数配置
		$('input[type=number]').each(function (key, item) {
			if($(item).attr('data-number') || $(item).attr('data-number') == 'int'){
			}else{
				$(item).attr('step', '0.001')
			}
		})
		
		//通用全选与取消全选操作
		$(document).on('click', 'input[type=checkbox].sh_checkall', function(e){
			var checkstatus = e.target.checked
			console.log(checkstatus)
			if(checkstatus){
				$('input[type=checkbox].sh_checkitem').prop('checked',true)
			}else{
				$('input[type=checkbox].sh_checkitem').prop('checked',false)
			}
		})
		
		//全局input增加输入删除按钮
		$(document).on('focus', '.ui.form .ui.icon.input input[type=text]:not([readonly],[disabled]),.ui.form .ui.icon.input input[type=number]:not([readonly],[disabled]),.ui.form .ui.icon.input input[type=password]:not([readonly],[disabled])', function(e){
			var that = $(this)
			var closebtn = '<i class="icon remove link sh_close"></i>'
			if(that.parents('.ui.icon.input').find('.sh_close').length > 0) return
			that.parents('.ui.icon.input').append(closebtn)
		})
		//全局input失去焦点清除删除按钮
		$(document).on('blur', '.ui.form input[type=text],input[type=number],input[type=password]', function(e){
			var that = $(this)
			if(!that.val()){
				that.parents('.input').find('.sh_close').remove()
			}
		})
		//全局input删除按钮点击清除
		$(document).on('click', '.input .sh_close', function(e){
			var that = $(this)
			var thatinput = that.parents('.input').find('input')
			thatinput.val('').focus()
		})
		
		//通用选择框增加自定义类操作
		$(document).on('click', '.sh_input_btn input[type=checkbox]', function(e){
			var checkstatus = e.target.checked
			if(checkstatus){
				$(this).parents('.sh_input_btn').addClass('checked')
			}else{
				$(this).parents('.sh_input_btn').removeClass('checked')
			}
			$(this).trigger('blur')
		})
		$(document).on('click', '.sh_input_btn input[type=radio]', function(e){
			$(this).parents('.ui.input').find('.sh_input_btn').removeClass('checked')
			$(this).parents('.sh_input_btn').addClass('checked')
		})
		
	})
	return _self
})(document);



$(function(){
	
	// 试卷中心点击题号快速到达方法
	$(".examPaperWrap .examPaperOverview .examPaperOverviewItem .qulist li").click(function(){
		var that = $(this)
		//获取点击索引
		var quindex = that.index()
		var qutypeitemindex = that.parents('.examPaperOverviewItem').index()
		//获取提醒及题干索引
		var qutypeitem = that.parents('.examPaperWrap').find('.examPaperContent .examPaperContentbox').find('.examPaperContentItem').eq(qutypeitemindex)
		var quitem = qutypeitem.find('.questionlist li').eq(quindex)
		//获取题干位置
		if(!quitem.length) return false
		var quscolltop = quitem.offset().top - 10
		sh.scrollTo(quscolltop)
	})
	
})

$(window).resize(function() {
	ExamWrapScroll()
});
ExamWrapScroll()
// 试卷中心列表概览区，滚动固定
function ExamWrapScroll(){
	//获取需要到达固定处滚动位置
	var divWrap = $(".computer .examPaperWrap .examPaperOverview, .examPaperWrap .examPaperStudents")
	var divWrapTop = $(".computer .examPaperWrap").length ? $(".computer .examPaperWrap").offset().top : null
	//获取document滚动条滚动位置
	var winScrollTop = $(window).scrollTop()
	if(divWrapTop != null && winScrollTop > divWrapTop){
		divWrap.css({
			top: winScrollTop-divWrapTop + 'px'
		})
	}else{
		divWrap.css({
			top: 0
		})
	}
	$(window).scroll(function(e){
		//获取document滚动条滚动位置
		var winScrollTop = $(window).scrollTop()
		var computer = $("html.computer")
		if(computer.length > 0 && divWrapTop != null && winScrollTop > divWrapTop){
			divWrap.css({
				top: winScrollTop-divWrapTop + 'px'
			})
		}else{
			divWrap.css({
				top: 0
			})
		}
	})
}

stuExamWrapScroll()
// 学生试卷中心列表概览区，滚动固定
function stuExamWrapScroll(){
	//获取需要到达固定处滚动位置
	var divWrap = $(".computer .examPaperStuWrap .examPaperStuContent")
	divWrap.scroll(function(e){
		//获取document滚动条滚动位置
		var divScrollTop = divWrap.scrollTop()
		var divWrapTop = divWrap.offset().top
		divWrap.find('.examPaperContentItem').each(function(k,item){
			var itemOffset = $(item).offset().top
			if(divWrapTop > itemOffset){
				$(item).addClass('on').siblings().removeClass('on')
			}
		})
	})
	
	//答题卡点击快速到达
	$(".examPaperStuWrap .examPaperStuOverview .qulist li").click(function(){
		var that = $(this)
		//获取点击索引
		var quindex = that.index()
		var quitem = that.parents('.examPaperStuWrap').find('.examPaperStuContent .quescontent').eq(quindex).parent('li')
		that.addClass('on').siblings().removeClass('on')
		//获取题干位置
		if(!quitem.length) return false
		var divScrollTop = divWrap.scrollTop()
		var quscolltop = quitem.offset().top
		divWrap.stop().animate({
			scrollTop: quscolltop+divScrollTop-355
		},300)
	})
}



