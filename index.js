/*
 * fis.baidu.com
 */

'use strict';


module.exports = function(options, modified, total, next) {
	if (!options.rules || typeof options.rules !== 'object') {
		fis.log.error('Invalid, please set option: {rules: {`file glob`: {from: `reg/string`, to: `function/string` }}}');
	}

	modified.forEach(function(file) {
		// 验证是否文本类型文件
		if (!file.isText() && typeof(file.getContent()) !== 'string') return;

		fis.util.map(options.rules, function(filepath, rule){
			// 检查是否有此打包规则，检查替换规则是否存在
			if(!fis.util.glob(filepath, file.url) || typeof rule !== 'object') return;

			var content = file.getContent();

			if (fis.util.is(rule.from, 'String')) {
				rule.from = new RegExp(fis.util.escapeReg(rule.from), 'g');
			}

			if (!fis.util.is(rule.from, 'RegExp')) {
				fis.log.error('fis3-deploy-replace: option.from must a string or RegExp.');
			}

			var result = content.replace(rule.from, rule.to);

			file.setContent(result);
			if (result !== content) {
				fis.log.debug('Replace from %s to %s in file [%s]', rule.from, rule.to, file);
			}
		});
	});
	next();
};
