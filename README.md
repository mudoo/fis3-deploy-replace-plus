# fis3-deploy-replace-plus
基于官方 [fis3-deploy-replace](https://github.com/fex-team/fis3-deploy-replace) 增强功能，支持文件匹配([glob](https://github.com/fex-team/fis3/blob/master/doc/docs/api/config-glob.md))。  
虽然可以配合match使用，但是毕竟是deploy插件，直接写在match('**'')中使用比较方便。Over.


## INSTALL

```bash
npm install [-g] fis3-deploy-replace-plus
```

## USE

```js
fis.match('**', {
    deploy: [
        fis.plugin('replace-plus', {
        	rules : {
        		'*.html' : {
		            from: 'from/string',
		            to: 'to/string'
		        },
		        'js/**.js' : {
		            from: /(img|cdn)\.baidu\.com/gi,
		            to: function ($0, $1) {
		                switch ($1) {
		                    case 'img':
		                        return '127.0.0.1:8080';
		                    case 'cdn':
		                        return '127.0.0.1:8081';
		                }
		                return $0;
		            }
		        }
	        }
        }),
        fis.plugin('local-deliver') //must add a deliver, such as http-push, local-deliver
    ]
});
```

