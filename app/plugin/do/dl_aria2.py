import os

from altfe.interface.root import interRoot


@interRoot.bind("api/biu/do/dl_aria2/", "PLUGIN")
class dlAria2(interRoot):
    def run(self, cmd):
        try:
            args = self.STATIC.arg.getArgs("dl_aria2", ["url", "workID=0"])
        except:
            return {"code": 0, "msg": "missing parameters"}
        
        if args["fun"]["workID"] == 0:
            return {"code": 0, "msg": "missing parameters"}

        return {
            "code": 1,
            "msg": {"way": "do", "args": args, "rst": self.dl(args["ops"].copy(), args["fun"].copy())},
        }
    
    def dl(self, opsArg, funArg):
        root_uri = self.CORE.biu.sets["biu"]["download"]["saveThumbFolder"].replace("{ROOTPATH}", self.getENV("rootPath"))
        if not os.path.exists(root_uri):
            os.mkdir(root_uri)
        url = funArg["url"]
        ext = ".png" if ".png" in url else ".jpg"
        
        full_path = os.path.join(root_uri, funArg["workID"] + ext)
        if os.path.exists(full_path):
            return True

        args = {
            "url": url.replace("https://i.pximg.net", self.CORE.biu.pximgURL),
            "folder": root_uri,
            "name": funArg["workID"] + ext,
            "dlArgs": {
                "_headers": {"referer": "https://app-api.pixiv.net/"},
                "@requests": {"proxies": {"https": self.CORE.biu.proxy}},
                "@aria2": {
                    "referer": "https://app-api.pixiv.net/",
                    "all-proxy": self.CORE.biu.proxy
                }
            },
        }
        status = [args]
        if self.CORE.dl.add(funArg["workID"] + "_t", status):
            return "running"
        else:
            return False