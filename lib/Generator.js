/*
 * @Author: yft 
 * @Date: 2022-07-12 14:20:39
 * @LastEditors: yft 
 * @LastEditTime: 2022-07-12 14:45:46
 * @FilePath: /lux/lib/Generator.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export class Generator {
    constructor(name,target){
        this.name = name
        this.target = target
    }
    //  创建项目
    create(){
        console.log(this.name,this.target)
    }
}