package stat

import (
    "fmt"
    "time"
    "strconv"
    "github.com/labstack/echo"
    mid "github.com/yellia1989/tex-web/backend/middleware"
    "github.com/yellia1989/tex-web/backend/common"
)

type _newaddlog struct {
    Statymd string `json:"statymd"`
    AccountnumTotal float32 `json:"total_accountnum"`
    RolenumTotal float32 `json:"total_rolenum"`
    RolenumTotalRate string `json:"total_rolenum_rate"`
    Accountnum float32 `json:"accountnum"`
    Startgame float32 `json:"startgame"`
    AccountnumRate string `json:"accountnum_rate"`
    Rolenum float32 `json:"rolenum"`
    Create2num float32 `json:"create2num"`
    RolenumRate string `json:"rolenum_rate"`
}

func NewaddList(c echo.Context) error {
    ctx := c.(*mid.Context)
    page, _ := strconv.Atoi(ctx.QueryParam("page"))
    limit, _ := strconv.Atoi(ctx.QueryParam("limit"))
    startTime := ctx.QueryParam("startTime")
    endTime := ctx.QueryParam("endTime")

    now := time.Now()
    if startTime == "" {
        startTime = now.Add(-7*24*time.Hour).Format("2006-01-02")
    }
    if endTime == "" {
        endTime = now.Format("2006-01-02")
    }

    db := common.GetStatDb()
    if db == nil {
        return ctx.SendError(-1, "连接数据库失败")
    }

    tx, err := db.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()

    _, err = tx.Exec("USE db_stat")
    if err != nil {
        return err
    }

    sql := "SELECT statymd,sum(accountnum) as sum_accountnum,(sum(rolenum_new)+sum(rolenum_old)) as sum_rolenum,sum(rolenum_startgame) as sum_rolenum_startgame,sum(rolenum_create2) as sum_create2num,sum(total_accountnum) as sum_total_accountnum,sum(total_rolenum) as sum_total_rolenum FROM t_newadd"
    sql += " WHERE zoneid=0 AND statymd between '"+startTime+"' AND '"+endTime+"'" 
    sql += " GROUP BY statymd"
    sql += " ORDER BY statymd desc"
    var total int
    err = tx.QueryRow("SELECT count(*) as total FROM ("+sql+") a").Scan(&total)
    if err != nil {
        return err
    }

    limitstart := strconv.Itoa((page-1)*limit)
    limitrow := strconv.Itoa(limit)
    sql += " LIMIT "+limitstart+","+limitrow

    c.Logger().Debug(sql)

    rows, err := tx.Query(sql)
    if err != nil {
        return err
    }
    defer rows.Close()

    logs := make([]_newaddlog, 0)
    for rows.Next() {
        var r _newaddlog
        if err := rows.Scan(&r.Statymd, &r.Accountnum, &r.Rolenum, &r.Startgame, &r.Create2num, &r.AccountnumTotal, &r.RolenumTotal); err != nil {
            return err
        }
        r.RolenumTotalRate = "0.0%"
        r.AccountnumRate = "0.0%"
        r.RolenumRate = "0.0%"
        if r.AccountnumTotal != 0 {
            r.RolenumTotalRate = fmt.Sprintf("%.2f%%", r.RolenumTotal/r.AccountnumTotal)
        }
        if r.Accountnum != 0 {
            r.AccountnumRate = fmt.Sprintf("%.2f%%", r.Startgame/r.Accountnum)
        }
        if r.Rolenum != 0 {
            r.RolenumRate = fmt.Sprintf("%.2f%%", r.Create2num/r.Rolenum)
        }
        logs = append(logs, r)
    }
    if err := rows.Err(); err != nil {
        return err
    }

    if err := tx.Commit(); err != nil {
        return err
    }

    return ctx.SendArray(logs, total)
}
