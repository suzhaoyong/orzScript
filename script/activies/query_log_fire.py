#!/usr/bin/env python3
# -*- coding: utf-8 -*

import os
import logging
import time
import re
import datetime
now = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

if "WSKEY_DEBUG" in os.environ:
    logging.basicConfig(level=logging.DEBUG, format='%(message)s')
    logger = logging.getLogger(__name__)
    logger.debug("\nDEBUG模式开启!\n")
else:
    logging.basicConfig(level=logging.INFO, format='%(message)s')
    logger = logging.getLogger(__name__)
try:
    import requests
except Exception as e:
    print(e, "\n缺少requests 模块，请执行命令安装：python3 -m pip install requests")
    exit(3)
pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
cookies = ''



class getLogsFile(object):
    # 获取文件
    def getlogfile(self):
        file_dir='/ql/log/dwsj_3_27/'

        list=os.listdir(file_dir)
        list.sort(key=lambda fn: os.path.getmtime(file_dir+fn) if not os.path.isdir(file_dir+fn) else 0)

        # 获取文件时间
        d=datetime.datetime.fromtimestamp(os.path.getmtime(file_dir+list[-1]))
        print('最后改动的文件是'+list[-1]+"，时间："+d.strftime("%Y-%m-%d %H-%M-%S"))
        return file_dir + list[-1]


    # 获取文件内容
    def readLogsFile(self):

        logfile = self.getlogfile()
        try:
            if os.path.exists(logfile):
                logfiles=''
                with open(logfile, "r", encoding="utf-8") as f:
                    logfiles = f.read()
                    f.close()
                logs = logfiles.split('\n')
                if len(logs) > 0:
                    curaccount=''
                    for i in logs:
                        if '账号任务' in i:
                            curaccount = i
                        if '---着火建筑开始位置' in i and '---着火建筑开始位置：无' not in i:
                            print(curaccount + '\n' +i)
                            if "PUSH_PLUS_TOKEN" in os.environ:
                                push_pushplus(os.environ['PUSH_PLUS_TOKEN'], curaccount + '\n' +i)
                            go_cqhttp('5857着火警报', curaccount + '起火了赶紧处理')
            else:
                print("未获取到文件")
        except Exception as e:
            print(f"readLogsFile Error】{e}")

# 推送pushplus
def push_pushplus(token, content=""):
    """
    推送消息到pushplus
    """
    if token == '':
        print("[注意] 未提供token，不进行pushplus推送！")
    else:
        server_url = f"http://www.pushplus.plus/send"
        params = {
            "token": token,
            "title": '着火警报⚠️',
            "content": content
        }
 
        response = requests.get(server_url, params=params)
        json_data = response.json()
 
        if json_data['code'] == 200:
            print(f"[{now}] 推送成功。")
        else:
            print(f"[{now}] 推送失败：{json_data['code']}({json_data['message']})")

def go_cqhttp(title, content):
    """
    使用 go_cqhttp 推送消息。
    """
    GOBOT_URL=""
    GOBOT_QQ=""
    url = GOBOT_URL+'?access_token=""&'+GOBOT_QQ+'&message=标题:'+title+'\n内容:'+content+''
    response = requests.get(url).json()

    if response["status"] == "ok":
        print("go-cqhttp 推送成功！")
    else:
        print("go-cqhttp 推送失败！")   

if __name__ == '__main__':
    
    getFile = getLogsFile()
    getFile.readLogsFile()
    
    print("=======结束======")



