import { spawn } from 'child_process'
import { projRoot } from './path'
import chalk from 'chalk'

/**
 * @param command 命令
 * @param cwd 当前工作目录
 */
export const run = (command: string, cwd: string = projRoot) => {
    return new Promise<void>((resolve, reject) => {
        const [cmd, ...args] = command.split(' ')

        const fullCmd = `${cmd} ${args.join(' ')}`
        console.log(`run: ${chalk.green(fullCmd)}`)

        // 调用子进程执行命令
        const app = spawn(cmd, args, {
            cwd,
            stdio: 'inherit',
            shell: process.platform === 'win32'
        })

        const onProcessExit = () => app.kill('SIGHUP')

        app.on('close', (code) => {
            process.removeListener('exit', onProcessExit)

            if (code === 0) resolve()
            else
                reject(
                    new Error(
                        `命令执行失败- \n Command: ${command} \n Code: ${code}`
                    )
                )
        })
        process.on('exit', onProcessExit)
    })
}
