package game

import (
    "fmt"
    "time"
    "database/sql"
    "github.com/labstack/echo"
    mid "github.com/yellia1989/tex-web/backend/middleware"
    "github.com/yellia1989/tex-web/backend/common"
)

func realtime(day string, table string) ([]uint32,error) {
    db := common.GetLogDb()
    if db == nil {
        return nil,fmt.Errorf("连接数据库失败")
    }

    tx, err := db.Begin()
    if err != nil {
        return nil,err
    }
    defer tx.Rollback()

    _, err = tx.Exec("USE log_global")
    if err != nil {
        return nil,err
    }

    sql := "SELECT time, sum(num) as num FROM realtime_"+table+" WHERE left(time,10)="
    if table == "income" {
        sql = "SELECT time, round(sum(num)/100) as num FROM realtime_"+table+" WHERE left(time,10)="
    }

    sql += "'"+day+"'"
    sql += " GROUP BY time ORDER BY time"

    rows, err := tx.Query(sql)
    if err != nil {
        return nil,err
    }
    defer rows.Close()

    points := make(map[string]uint32, 0)
    for rows.Next() {
        var time string
        var num uint32
        if err := rows.Scan(&time, &num); err != nil {
            return nil,err
        }
        points[time] = num
    }
    if err := rows.Err(); err != nil {
        return nil,err
    }

    if err := tx.Commit(); err != nil {
        return nil,err
    }

    daytime, err := time.Parse("2006-01-02 15:04:05", day + " 00:00:00")
    if err != nil {
        return nil,err
    }

    ret := make([]uint32,288)
    for i,_ := range ret {
        t := daytime.Add(time.Duration(i*300)*time.Second).Format("2006-01-02 15:04:05")
        if n,ok := points[t]; ok {
            ret[i] = n
        }
    }

    return ret,nil
}

func RealOnline(c echo.Context) error {
    ctx := c.(*mid.Context)

    now := time.Now()

    // 今日在线
    data := make(map[string][]uint32,0)
    today, err := realtime(now.Format("2006-01-02"), "online")
    if err != nil {
        return err
    }
    data["today"] = today

    // 昨日在线
    yesterday, err := realtime(now.Add(-24*time.Hour).Format("2006-01-02"), "online")
    if err != nil {
        return err
    }
    data["yesterday"] = yesterday

    // 上周同期
    lastweek, err := realtime(now.Add(-24*7*time.Hour).Format("2006-01-02"), "online")
    if err != nil {
        return err
    }
    data["lastweek"] = lastweek

    // 上月同期
    lastmonth, err := realtime(now.Add(-24*30*time.Hour).Format("2006-01-02"), "online")
    if err != nil {
        return err
    }
    data["lastmonth"] = lastmonth
    
    return ctx.SendResponse(data)
}

func RealNewadd(c echo.Context) error {
    ctx := c.(*mid.Context)

    now := time.Now()

    // 今日新增
    data := make(map[string][]uint32,0)
    today, err := realtime(now.Format("2006-01-02"), "newrole")
    if err != nil {
        return err
    }
    data["today"] = today

    // 昨日新增
    yesterday, err := realtime(now.Add(-24*time.Hour).Format("2006-01-02"), "newrole")
    if err != nil {
        return err
    }
    data["yesterday"] = yesterday

    // 上周同期
    lastweek, err := realtime(now.Add(-24*7*time.Hour).Format("2006-01-02"), "newrole")
    if err != nil {
        return err
    }
    data["lastweek"] = lastweek

    // 上月同期
    lastmonth, err := realtime(now.Add(-24*30*time.Hour).Format("2006-01-02"), "newrole")
    if err != nil {
        return err
    }
    data["lastmonth"] = lastmonth
    
    return ctx.SendResponse(data)
}

func RealIncome(c echo.Context) error {
    ctx := c.(*mid.Context)

    now := time.Now()

    // 今日充值
    data := make(map[string][]uint32,0)
    today, err := realtime(now.Format("2006-01-02"), "income")
    if err != nil {
        return err
    }
    data["today"] = today

    // 昨日充值
    yesterday, err := realtime(now.Add(-24*time.Hour).Format("2006-01-02"), "income")
    if err != nil {
        return err
    }
    data["yesterday"] = yesterday

    // 上周同期
    lastweek, err := realtime(now.Add(-24*7*time.Hour).Format("2006-01-02"), "income")
    if err != nil {
        return err
    }
    data["lastweek"] = lastweek

    // 上月同期
    lastmonth, err := realtime(now.Add(-24*30*time.Hour).Format("2006-01-02"), "income")
    if err != nil {
        return err
    }
    data["lastmonth"] = lastmonth
    
    return ctx.SendResponse(data)
}

func RealStageVerify(c echo.Context) error {
    ctx := c.(*mid.Context)
    now := time.Now()

    // 在线
    data := make(map[string][]uint32,0)
    online, err := realtime(now.Format("2006-01-02"), "online")
    if err != nil {
        return err
    }
    data["online"] = online

    // 验证次数
    times, err := realtime(now.Format("2006-01-02"), "stageverify")
    if err != nil {
        return err
    }
    data["times"] = times

    // 排队时间
    queuetime, err := realtime(now.Format("2006-01-02"), "stageverify_queue")
    if err != nil {
        return err
    }
    for i,v := range queuetime {
        if times[i] != 0 {
            queuetime[i] = v/times[i]
        }
    }
    data["queuetime"] = queuetime

    // 验证时间
    usetime, err := realtime(now.Format("2006-01-02"), "stageverify_use")
    if err != nil {
        return err
    }
    for i,v := range usetime {
        if times[i] != 0 {
            usetime[i] = v/times[i]
        }
    }
    data["usetime"] = usetime
    
    return ctx.SendResponse(data)
}

func stat(ssql string) (int32,error) {
    var total sql.NullInt32
    db := common.GetLogDb()
    if db == nil {
        return total.Int32,fmt.Errorf("连接数据库失败")
    }

    tx, err := db.Begin()
    if err != nil {
        return total.Int32,err
    }
    defer tx.Rollback()

    _, err = tx.Exec("USE log_global")
    if err != nil {
        return total.Int32,err
    }

    err = tx.QueryRow(ssql).Scan(&total)
    if err != nil {
        return total.Int32,err
    }

    if err := tx.Commit(); err != nil {
        return total.Int32,err
    }

    return total.Int32,nil
}

func RealStat(c echo.Context) error {
    ctx := c.(*mid.Context)
    now := time.Now()

    data := make(map[string]int32, 0)

    // 今日充值
    todayIncome, err := stat("SELECT round(sum(price)) as total FROM iap_recharge WHERE logymd='"+now.Format("2006-01-02")+"'")
    if err != nil {
        return err
    }
    data["todayIncome"] = todayIncome
    // 累计充值
    totalIncome, err := stat("SELECT round(sum(price)) as total FROM iap_recharge")
    if err != nil {
        return err
    }
    data["totalIncome"] = totalIncome

    // 今日活跃
    todayActive, err := stat("SELECT count(distinct roleid) as total FROM login WHERE logymd='"+now.Format("2006-01-02")+"'")
    if err != nil {
        return err
    }
    data["todayActive"] = todayActive

    // 今日新增
    todayNewadd, err := stat("SELECT count(distinct roleid) as total FROM create_role WHERE logymd='"+now.Format("2006-01-02")+"'")
    if err != nil {
        return err
    }
    data["todayNewadd"] = todayNewadd

    // 累计新增
    totalNewadd, err := stat("SELECT count(distinct roleid) as total FROM create_role")
    if err != nil {
        return err
    }
    data["totalNewadd"] = totalNewadd

    // 今日注册
    todayAccount, err := stat("SELECT count(accountid) as total FROM account_create WHERE timeymd='"+now.Format("2006-01-02")+"'")
    if err != nil {
        return err
    }
    data["todayAccount"] = todayAccount

    // 累计注册
    totalAccount, err := stat("SELECT count(accountid) as total FROM account_create")
    if err != nil {
        return err
    }
    data["totalAccount"] = totalAccount

    return ctx.SendResponse(data)
}
