import os
import datetime

if __name__ == "__main__":
    variable_num = os.environ["DWSJVariableNum"]
    config_file_name = "dwsj.config_"+variable_num+".js"

    if os.path.exists(config_file_name):
        with open(config_file_name, "r", encoding="utf-8") as f:
            config = f.read()
            f.close()
        reconfig = config.replace('"action":1', '"action":0')
        if datetime.datetime.now().hour == 6:
            reconfig = reconfig.replace('"worship":1','"worship":0').replace('"accelerate":1', '"accelerate":0')
        with open(config_file_name, "wt", encoding="utf-8") as f:
            f.write(reconfig)
            f.close()