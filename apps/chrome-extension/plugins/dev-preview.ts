/**
 * @description 把app.tsx的div标签的classname改成w-100,生产模式下改成w-full,这样就可以在开发模式下预览了,不用每次都打包手动修改,这里用正则表达式实现，也可以用其他方式实现，比如ast
 * @author
 * @returns 
 */
export default function DevPreview() {
    return {
        name: 'dev-preview-plugin',
        transform(code: string, id: string) {
            if (id.endsWith('App.tsx')) {
                const isDev = process.env.NODE_ENV === 'development';
                if (isDev) {
                    return code.replace(/w-full/, 'w-100');
                } 
            }
        }
    };
}