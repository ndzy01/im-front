import React, { useState, useEffect } from 'react';

function dateFormat(fmt: string, date?: Date) {
  const date_ = date ? date : new Date();

  const o: any = {
    'M+': date_.getMonth() + 1, //月份
    'd+': date_.getDate(), //日
    'h+': date_.getHours(), //小时
    'm+': date_.getMinutes(), //分
    's+': date_.getSeconds(), //秒
    'q+': Math.floor((date_.getMonth() + 3) / 3), //季度
    S: date_.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date_.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

function Clock() {
  const [date, setDate] = useState(new Date());
  const [dateValue, setDateValue] = useState('');

  useEffect(() => {
    function tick() {
      setDate(new Date());
    }
    const timerID = setInterval(tick, 1000);

    return function clearTick() {
      clearInterval(timerID);
    };
  });

  useEffect(() => {
    setDateValue(dateFormat('yyyy-MM-dd hh:mm:ss', date));
  }, [date]);

  return <span>{dateValue}</span>;
}

export default Clock;
