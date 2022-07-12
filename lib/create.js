/*
 * @Author: yft 
 * @Date: 2022-06-09 19:36:58
 * @LastEditors: yft 
 * @LastEditTime: 2022-07-12 14:50:39
 * @FilePath: /lux/lib/create.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import path from 'path'
import fs from 'fs-extra'
import Inquirer from 'inquirer'
import {loading}  from './utils.js'
import {Generator} from './Generator'

export   async function create (projectName, options){
  // 获取当前工作目录
  const cwd = process.cwd()
  // 拼接获得项目目录
  const targetDirectory = path.join(cwd, projectName)
  // 判断项目目录是否存在
  if(fs.existsSync(targetDirectory)){
    // 判断是否使用 --force 参数
    if(options.force){
      // 删除重名目录 （remove是异步方法）
      await fs.remove(targetDirectory)
    }else{
      let {isOverwrite} = await new Inquirer.prompt([
        // 返回值为 Promise
        {
          name:'isOverwrite',
          type:'list',
          message: "Target directory exists, Please choose an action",
          choices: [
            { name: "Overwrite", value: true },
            { name: "Cancel", value: false },
          ]
        }
      ])

      // 选择 cancel
      if(!isOverwrite){
        console.log('Cancel')
        return
      }else{
        // 选择 Overwrite，先删除原有重名目录
        console.log('\r\nRemoving')
        await loading(
          `Removing ${projectName}, please wait a minute`,
          fs.remove,
          targetDirectory
        )
      }
    }
  }

  //  创建项目
  const generator = new Generator(projectName,targetDirectory)
  generator.create()
}

