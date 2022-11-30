const { default: axios } = require('axios');
const logger = require('./logger');
require('dotenv').config();

const API_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst';
const DATA_TYPE = 'JSON';
const SEOUL_X = '60';
const SEOUL_Y = '127';
const SERVICE_KEY = process.env.WEATHER_API_KEY;

const getWeather = async () => {
  const now = new Date();


  if (now.getHours() < 2 && now.getMinutes() < 15) {
    now.setDate(now.getDate() - 1);
  }
  now.setHours(2, 0, 0, 0);

  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const date = year + month + day;
  const time = now.getHours().toString().padStart(2, '0') + '00';

  logger.info(`Getting weather for ${date} ${time}`);

  await axios.get(API_URL, {
    params: {
      ServiceKey: SERVICE_KEY,
      dataType: DATA_TYPE,
      base_date: date,
      base_time: time,
      nx: SEOUL_X,
      ny: SEOUL_Y,
      numOfRows: 1000,
    },
  }).then((response) => {
    try {
      let result = '';
      // parse xml
      const data = response.data;
      if (data.response.header.resultCode !== '00') {
        logger.error('Failed to get weather: ' + data.response.header.resultMsg);
        throw new Error('API 호출 실패');
      }
      // console.log(JSON.stringify(data));
      let items = data.response.body.items;
      items = items.item.filter(i => i.fcstDate == date);

      let tmp = '';
      let tmn = '';
      let tmx = '';
      let sky = '';
      let pty = '';
      for (const item of items) {
        if (tmp !== '' && tmn !== '' && tmx !== '' && sky !== '' && pty !== '') {
          break;
        }
        if (item.category === 'PTY') {
          pty = parsePty(item.fcstValue);
        } else if (item.category === 'SKY') {
          sky = parseSky(item.fcstValue);
        } else if (item.category === 'TMP') {
          tmp = item.fcstValue;
        } else if (item.category === 'TMN') {
          tmn = item.fcstValue;
        } else if (item.category === 'TMX') {
          tmx = item.fcstValue;
        }
      }
      result = `최저 ${tmn}도, 최고 ${tmx}도, 하늘상태는 ${sky}, 강수 상태는 ${pty}입니다.`;
      logger.info(result);
      return result;
    } catch (error) {
      logger.error(error);
      return '날씨 정보를 가져오는데 실패했습니다.';
    }

  }).catch((error) => {
    logger.error(error);
    return '날씨 정보를 가져오는데 실패했습니다.';
  });
};

const ptyMap = {
  0: '없음',
  1: '비',
  2: '비/눈',
  3: '눈',
  4: '소나기',
};
const skyMap = {
  1: '맑음',
  3: '구름많음',
  4: '흐림',
};

const parsePty = (pty) => {

  try {
    return ptyMap[pty];
  } catch (error) {
    logger.error(error);
    return '알 수 없음';
  }
};

const parseSky = (sky) => {
  try {
    return skyMap[sky];
  } catch (error) {
    logger.error(error);
    return '알 수 없음';
  }
};

module.exports = {
  getWeather,
};