package gm

import (
    "strings"
    "github.com/labstack/echo"
    mid "github.com/yellia1989/tex-web/backend/middleware"
    "github.com/yellia1989/tex-web/backend/api/gm/rpc"
)

func ChannelList(c echo.Context) error {
    ctx := c.(*mid.Context)

    loginPrx := new(rpc.LoginService)
    comm.StringToProxy("aqua.LoginServer.LoginServiceObj", loginPrx)

    var channels []rpc.ChannelAddr
    ret, err := loginPrx.GetAllChannel(&channels)
    if err := checkRet(ret, err); err != nil {
        return err
    }
    
    return ctx.SendResponse(channels)
}

func ChannelAdd(c echo.Context) error {
    ctx := c.(*mid.Context)

    sChannel := ctx.FormValue("sChannel")
    sAddress := ctx.FormValue("sAddress")
    sRes := ctx.FormValue("sRes")
    if sChannel == "" || sAddress == "" || sRes == "" {
        return ctx.SendError(-1, "参数非法")
    }

    loginPrx := new(rpc.LoginService)
    comm.StringToProxy("aqua.LoginServer.LoginServiceObj", loginPrx)

    ret, err := loginPrx.AddNewChannel(sChannel, sAddress, sRes)
    if err := checkRet(ret, err); err != nil {
        return err
    }

    return ctx.SendResponse("添加渠道成功")
}

func ChannelDel(c echo.Context) error {
    ctx := c.(*mid.Context)

    ids := strings.Split(ctx.FormValue("idsStr"), ",")
    if len(ids) == 0 {
        return ctx.SendError(-1, "渠道不存在")
    }

    loginPrx := new(rpc.LoginService)
    comm.StringToProxy("aqua.LoginServer.LoginServiceObj", loginPrx)

    for _, id := range ids {
        ret, err := loginPrx.DelChannel(id)
        if err := checkRet(ret, err); err != nil {
            return err
        }
    }

    return ctx.SendResponse("删除渠道成功")
}

func ChannelUpdate(c echo.Context) error {
    ctx := c.(*mid.Context)

    sChannel := ctx.FormValue("sChannel")
    sAddress := ctx.FormValue("sAddress")
    sRes := ctx.FormValue("sRes")
    if sChannel == "" || sAddress == "" || sRes == "" {
        return ctx.SendError(-1, "参数非法")
    }

    loginPrx := new(rpc.LoginService)
    comm.StringToProxy("aqua.LoginServer.LoginServiceObj", loginPrx)

    ret, err := loginPrx.ModifyChannel(sChannel, sAddress, sRes)
    if err := checkRet(ret, err); err != nil {
        return err
    }

    return ctx.SendResponse("修改渠道成功")
}
