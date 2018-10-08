// pages/publish/post/post.js
const app = getApp();
var lock=false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    picIds:[],
    picCount:0,
    indexArray: [0, 0],
    cateArray: [['房屋信息', '二手市场', '求职招聘', '汽车交易', '蚂蚁生活', '拼车信息', '短租民宿', '生意转让','房产信息','往返带物'], ['求租', '招租']],
    areaArray:[],
    areaIndex:[0,0],
    areaOrgin:[],
    cateId: [1, 2, 3, 4, 5, 6, 7, 8, 12, 16],
    cateSecondId: [0,1],
    dayArray:['1天','7天','30天'],
    dayIndex:0,
    houseArray:['请选择','公寓','别墅','联排别墅','小区','办公室','商铺','车库','其他'],
    houseIndex:0,
    houseType:['请选择','床位','客厅','双人床','主卧','单间','整租'],
    typeIndex:0,
    weekArray:['周','月','日'],
    startDate:'',
    speedArray: ['请选择','自动', '手动'],
    brandArray: ['请选择品牌','Alfa Romeo 阿尔法罗密欧','Audi 奥迪','BMW 宝马','Chrysler 克莱斯勒','Chverolet 雪佛兰','Citroen 雪铁龙','Dodge 道奇','Ford 福特','Holden 霍尔顿','Honda 本田','Hyundai 现代','Kia 起亚','Land Rover 路虎','Lexus 雷克萨斯','Mazda 马自达','Mercedes Benz 奔驰','Mitsubishi 三菱','Nissan 东风日产','Peugeot 标志','Porsche 保时捷','Renault 雷诺','Subaru 斯巴鲁','Suzuki 铃木','Toyota 丰田','Volkswagen 大众','Volvo 沃尔沃','Other 其它品牌'],
    allModelArray:{
      '1': ['请选择型号','146', '147', '155', '156', '159', '166', '33', '4C', '75', 'Giulia', 'Giulietta', 'GT', 'GTV', 'MiTo', 'Spider','Sprint'],
      '2': ['请选择型号','100', '80', '90', '90E', 'A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Allroad', 'Avant', 'Q2', 'Q3', 'Q5', 'Q7', 'R8', 'RS Q3', 'RS3', 'RS4', 'RS5', 'RS6', 'RS7', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'SQ5', 'SQ7', 'TT', 'TTRS','TTS'],
      '3': ['请选择型号','Any model', '116i', '118d', '118i', '120d', '120i', '123d', '125i', '130i', '135i', '218d', '218i', '220i', '235i', '3', '316', '316i', '316ti', '318', '318ci', '318d', '318i', '318is', '318ti', '320ci', '320d', '320i', '323', '323i', '325ci', '325d', '325i', '328', '328ci', '328i', '330', '330ci', '330d', '330e', '330i', '335ci', '335d', '335i', '340i', '420d', '428i', '435d', '440i', '520d', '520i', '523', '523i', '525', '525d', '525i', '528i', '530', '530d', '530i', '535', '535d', '535i', '540', '540i', '545i', '550i', '630i', '640d', '640i', '645ci', '650ci', '650i', '728i', '730D', '730i', '730LD', '735', '735i', '740', '740d', '740e', '740i', '740iL', '745i', '745iL', '745Li', '750i', '750Li', '760Li', 'Compact', 'M', 'M1', 'M135i', 'M140i', 'M2', 'M235i', 'M3', 'M4', 'M5', 'M6', 'Mini', 'Mini Cooper', 'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'Z3', 'Z4','Other'],
      '4': ['请选择型号','300', '300 SRT', '300C', '52', '62', 'Avenger', 'Crossfire', 'FURY COUPE', 'G70', 'Grand Voyager', 'Hillman', 'Jeep', 'Jeep Grand Cherokee', 'Neon', 'New Yorker', 'PT Cruiser', 'Sebring', 'Valiant', 'Voyager','Windsor'],
      '5': ['请选择型号','210', '56', 'Belair', 'Blazer', 'C1500', 'C20', 'Camaro', 'Caprice', 'Cheyenne', 'Corvette', 'Coupe', 'Cruze', 'El camino', 'Electra', 'Flatback', 'Fleetmaster', 'Impala', 'Master', 'MW', 'MWG', 'Oladsmobile', 'Optra', 'Pickup', 'Roadster', 'Silverado', 'Sonic', 'SS', 'Starcft', 'Suburban', 'Superior','Tahoe'],
      '6': ['请选择型号','Aircross', 'Berlingo', 'BX', 'C2', 'C3', 'C4', 'C5', 'CX', 'CX2200', 'DS23', 'DS3', 'DS4', 'DS5', 'Evasion', 'Light15', 'Saxo', 'Xantia', 'Xsara','ZX'],
      '7': ['请选择型号','Any model', 'Aspen', 'Avenger', 'Cailber', 'Challenger', 'Charger', 'DU', 'Journey', 'Nitro', 'Pioneer', 'Ram', 'RAM 1500', 'Viper','Other'],
      '8': ['请选择型号','Any model', 'Anglia', 'Bronco', 'Capri', 'Cortina', 'Courier', 'Deluxe', 'Econovan', 'Ecosport', 'Escape', 'Escort', 'Everest', 'Explorer', 'F150', 'F250', 'F350', 'Fairlane', 'Fairmont', 'Falcon', 'Festival', 'Fiesta', 'Focus', 'FPV', 'Ixion', 'Ka', 'Kuga', 'Laser', 'LTD', 'Mercury', 'Mondeo', 'Mustang', 'Probe', 'Ranger', 'Roadster', 'Sierra', 'Spectron', 'Taurus', 'Telstar', 'Terroitory', 'Thunderbird', 'Tourneo', 'Transit', 'Typhoon','XLT'],
      '9': ['请选择型号','Astra', 'Barina', 'Berlina', 'Calais', 'Caprice', 'Captiva', 'Cascada', 'Colorado', 'Combo', 'Commodore', 'Crewman', 'Cruze', 'Epica', 'Equinox', 'Frontera', 'Gemini', 'HSV Avalanche', 'HSV Clubsport', 'HSV Coupe', 'HSV Grange', 'HSV GTO', 'HSV GTS', 'HSV Maloo', 'HSV R8 Clubsport', 'HSV Senator', 'HSV Tourer R8', 'Insignia', 'Jackaroo', 'Kingswood', 'Malibu', 'Monaro', 'Monterey', 'Rodeo', 'Spark', 'SS', 'SS-V', 'Statesman', 'Torana', 'Trailblazer', 'Trax', 'Ute', 'Vectra', 'Viva', 'Volt','Zafire'],
      '10': ['请选择型号','Accord', 'Air', 'Airwave', 'Ascot', 'Avancier', 'Beat', 'Capa', 'City', 'Civic', 'Concerto', 'Crossroad', 'CR-V', 'CRX', 'CR-Z', 'Domani', 'EDIX', 'Elysion', 'Euro Civic', 'Fit', 'Freed', 'Horizon', 'HR-V', 'Insight', 'Inspire', 'Integra', 'Jazz', 'Lagreat', 'Legend', 'Logo', 'MDX', 'Mobilio', 'NSX', 'Odyssey', 'Orthia', 'Prelude', 'Rafaga', 'S2000', 'Saber', 'SMX', 'Spike', 'Step Wagon', 'Stream', 'Torneo', 'V6 Accord','Other'],
      '11': ['请选择型号','Hyundai'],
      '12': ['请选择型号','Carens', 'Carnival', 'Cerato', 'Koup', 'Magentis', 'Mentor', 'Niro', 'Optima', 'Picanto', 'Pregio', 'Proceed', 'Rio', 'Sorento', 'Soul', 'Soul EV', 'Spectra','Sportage'],
      '13': ['请选择型号','Defender', 'Discovery', 'Discovery Sport', 'Freelander', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport', 'Range Rover Velar', 'Series 3', 'TDV8','Other'],
      '14': ['请选择型号','Any model', 'CT 200h', 'ES 300', 'ES 300h', 'GS 250', 'GS 300', 'GS 300h', 'GS 350', 'GS 430', 'GS 450h', 'GS 460', 'GS F', 'IS 200', 'IS 200t', 'IS 220', 'IS 250', 'IS 300', 'IS 300h', 'IS F', 'L300', ' LS 400', 'LS 430', 'LS 460', 'LS 600', 'LX 450d', 'LX 470', 'LX 570', 'NX 200', 'NX 200t', 'NX 2300t', 'NX 300', 'NX 300h', 'RC 200t', 'RC 350', 'RC F', 'RX 300', 'RX 330', 'RX 350', 'RX 400h', 'RX 450h', 'SC 430','Other'],
      '15': ['请选择型号','121', '2', '3', '323', '6', '626', 'Astina', 'Atenza', 'Autozam', 'Axela', 'AZ 3', 'B1600', 'B2000', 'B2200', 'B2500', 'B2600', 'Biante', 'Bongo', 'Bounty', 'Brawny', 'BT-50', 'Capella', 'Cosmo', 'CX-3', 'CX-5', 'CX-7', 'CX-9', 'Demio', 'E1800', 'E2000', 'E2500', 'Etude', 'Eunos', 'Familia', 'Lantis', 'Luce', 'MPV', 'MS6', 'MS8', 'MS9', 'MX-5', 'MX6', 'Premacy', 'Proceed', 'Roadster', 'RX3', 'RX7', 'RX-8', 'Sentia', 'SP20', 'SP23', 'SP25', 'Titan', 'Tributte', 'Verisa','Other'],
      '16': ['请选择型号','Any model', '190E', '220', '230E', '260E', '280', '300', '300 E', '300 SE', '300 SL', '320', '350', '500', '500 SL', 'A 160', 'A 170', 'A 180', 'A 190', 'A 200', 'A 250', 'A 45', 'B 170', 'B 180', 'B 200', 'B 250', 'C 180', 'C 200', 'C 220', 'C 230', 'C 240', 'C 250', 'C 270', 'C 280', ' C 300', 'C 32', 'C 320', 'C 350', 'C 36', 'C 43', 'C 55', 'C 63', 'C Class Coach', 'CL 200', 'CL 500', 'CL 55', 'CL 550', 'CL 63', 'CLA 200', 'CLA', '250', 'CLA 45', ' CLC', 'CLC 200', 'CLK 240', 'CLK 280', 'CLK 320', 'CLK 350', 'CLK 500', 'CLK 55', 'CLK 63', 'CLS 250', 'CLS 320', 'CLS 350', 'CLS 400', 'CLS 500', 'CLS 55', 'CLS 550', 'CLS 63', 'E 200', 'E 220', 'E 240', 'E 250', 'E 280', 'E 300', 'E 320', 'E 350', 'E400', 'E 43', 'E 430', 'E 500', 'E 55', 'E 550', 'E 63', 'E-Class', 'G 330', 'G 350', 'G 63', 'GL 320', 'GL 350', 'GL 420', 'GL 500', 'GL 63', 'GLA 180', 'GLA 200', 'GLA 220d', 'GLA 250', 'GLA 45', 'GLC 220', 'GLC 250', 'GLE 250d', 'GLE 350', 'GLE 350d', 'GLE 63S', 'GLS 350d', 'GLS 63', 'GT', 'MB140', 'ML250', 'ML300', 'ML320', 'ML350', 'ML400', 'ML430', 'ML500', 'ML55', 'ML63', 'R320', 'R350', 'S280', 'S320', 'S350', 'S400', 'S430', 'S500', 'S550', 'S600', 'S63', 'S65', 'SL', 'SL 350', 'SL 400', 'SL 500', 'SL 63', 'SLC 180', 'SLC 200', 'SLC 300', 'SLC 43', 'SLK', 'SLK 200', 'SLK 230', 'SLK 250', 'SLK 280', 'SLK 300', 'SLK 320', 'SLK 350', 'SLK 500', 'SLK 55', 'SLK 600', 'SLK 63', 'SLK 65', 'SLS', 'Smart Car', 'Sprnter', 'V230', 'V250', 'V350', 'Valente', 'Vaneo', 'Viano', 'Vito','Other'],
      '17': ['请选择型号','Any model', '380', 'Airtrek', 'ASX', 'Canter', 'Carisma', 'Cedia', 'Challenger', 'Chariot', 'Colt', 'Cordia', 'Delica', 'Diamante', 'Dingo', 'Dion', 'Eclipse Cross', 'Emeraude', 'Eterna', 'FTO', 'Galant', 'Grandis', 'GTO', 'i-car', 'i-MIEV', 'Jeep', 'L200', 'L300', 'L400', 'Lancer', 'Legnum', 'Libero', 'Magna', 'Mini Cab', 'Mirage', 'Nimbus', 'Outlander', 'Pajero', 'RVR', 'Sigma', 'Starion', 'Strada', 'Town Box', 'Triton', 'V3000','Other'],
      '18': ['请选择型号','200SX', '300ZX', '350', '350Z', '370Z', 'AD', 'Altima', 'Atlas', 'Avenir', 'Basssara', 'Bluebird', 'Caravan', 'Cedric', 'Cefiro', 'Cima', 'Cube', 'Datsun', 'Dualis', 'Elgrand', 'e-NV200', 'Exa', 'Expert', 'Fairlady', 'Figaro', 'Fuga', 'Gloria', 'GTR', 'Homy', 'Infiniti', 'Juke', 'Kingcab', 'Lafesta', 'Largo', 'Laurel', 'Leaf', 'Leopard', 'Liberty', 'Lucino', 'March', 'Maxima', 'Micra', 'Mistral', 'Murano', 'Navara', 'Note', 'NV200', 'NV350', 'NX', 'PAO', 'Passage', 'Pathfinder', 'Patrol', 'Prairie', 'Presage', 'Presea', 'Primaster', 'Primera', 'Pulsar', 'Qashqai', 'Rasheen', 'Regulus', 'Rnessa', 'Safari', 'S-Cargo', 'Sentra', 'Serena', 'Sivia', 'Skyline', 'Stegea', 'Sunny', 'Sylphy', 'Teana', 'Terrano', 'Tida', 'Tino', 'Titan', 'Urvan', 'Ute', 'Vanette', 'Wingroad', 'X-Trail','Other'],
      '19': ['请选择型号','Peugeot'],
      '20': ['请选择型号','Porsche'],
      '21': ['请选择型号','Captur', 'Clio', 'Espace', 'Kangoo', 'Koleos', 'Laguna', 'Lutecia', 'Master', 'Megane', 'Scenic', 'Trafic', 'Twingo','Other'],
      '22': ['请选择型号','Any model', 'Ace', 'B4', 'Brumby', 'BRZ', 'Exiga', 'Forester', 'Impreza', 'Justy', 'Lancaster', 'Legacy', 'Levorg', 'Omega', 'Outback', 'Sambar', 'SVX', 'Traviq', 'Trezia', 'Tribeca', 'WRX', 'WRX STI', 'XV','Other'],
      '23': ['请选择型号','Any model', 'Aerio', 'Alto', 'APV', 'Baleno', 'Carry', 'Celerio', 'Escudo', 'Farm Worker', 'Grand Escudo', 'Grand Vitara', 'Ignis', 'Jimny', 'Kizashi', 'Landy', 'Liana', 'Samurai', 'S-Cross', 'SFV650', 'SJ410', 'SJ413', 'Solio', 'Splash', 'Swift', 'SX4', 'Vitara', 'Wagon', 'X90','Other'],
      '24': ['请选择型号','Any model', '86', 'Allex', 'Alphard', 'Altezza', 'Altise', 'Aqua', 'Aristo', 'Auris', 'Avalon', 'Avensis', 'Axio', 'BB', 'Belta', 'Blade', 'Bilzzard', 'Brevis', 'Caldina', 'Camry', 'Carib', 'Carina', 'Cavalier', 'Celica', 'Celsior', 'Century', 'Ceres', 'Chaser', 'C-HR', 'Corolla', 'Corona', 'Corsa', 'Cressida', 'Cresta', 'Crown', 'Curren', 'Cynos', 'Duet', 'Dyna', 'Echo', 'Estima', 'Exiv', 'Fieldor', 'FJ Cruiser', 'Fortuner', 'FunCargo', 'Gaia', 'Grand Hiace', 'Granvia', 'GT', 'Harrier', 'Hiace', 'Highlander', 'Hilux', 'Ipsum', 'IQ', 'Isis', 'Lst', 'Kluger', 'Lancer', 'Land Cruiser', 'Land Cruiser Pradpo', 'Levin', 'Liteace', 'Lucida', 'Luxel', 'Mark', 'Mark 2', 'Mark-X', 'MR2', 'MR-S', 'Nadia', 'Noah', 'Opa', 'Paseo', 'Passo', 'Platz', 'Porte', 'Premio', 'Previa', 'Prius', 'Probox', 'Progress', 'Qualis', 'Ractis', 'Raum', 'RAV4', 'Regius', 'Rumion', 'Runx', 'Rush', 'Sai', 'Scepter', 'Sera', 'Slienta', 'Soarer', 'Spacio', 'Sprinter', 'Starlet', 'Succeed', 'Supra', 'Surf', 'Tercel', 'Townace', 'Toyoace', 'Trueno', 'Vanguard', 'Vellfire', 'Verossa', 'Vista', 'Vitz', 'Voltz', 'Voxy', 'Will', 'Windom', 'Wish', 'Yaris','Other'],
      '25': ['请选择型号','Amarok', 'Beetle', 'Bora', 'Caddy', 'Caravelle', 'CC', 'Crafter', 'Cross Polo', 'e-Golf', 'Eos', 'Golf', 'Jetta', 'Kombi', 'LT46 MWB', 'Multivan', 'Passat', 'Phaeton', 'Polo', 'Scirocco', 'Sharan', 'T5', 'Tiguan', 'Touareg', 'Touran', 'Transporter', 'Vento','Other'], 
      '26': ['请选择型号','360', '440', '740', '760', '850', '960', 'C30', 'C70', 'S40', 'S60', 'S70', 'S80', 'V30', 'V40', 'V50', 'V60', 'V70', 'V90', 'XC60', 'XC70', 'XC90','Other'],
      '27': ['请选择型号','Other']
    },
    modelArray:['请选择型号'],
    postData:{
      id: 0,
      title:'',
      content:'',
      address:'',
      lon:'',
      lat:'',
      mobile:'',
      price:'',
      week:0,
      tag1:'',
      tag2:'',
      school1:'',
      school2:'',
      wechat:'',
      area:'请选择区域',
      top:0,
      topDay:1,
      topPrice:10,
      personal:1,
      school:'',
      carType:1,
      start:'',
      end:'',
      mid:'',
      date:'',
      time:'',
      peopleNum:'',
      linkman:'',
      transType:1,
      transBrand:0,
      transModel:0,
      transYear:'',
      transPrice:'',
      transSpeed:0,
      transKm:'',
    },
    moneySign: '$',
    tagArr: ['近火车站', '近电车站', '近公车站', '近超市', '近学校', '带车位', '包家具', '包水电', '可议价', '主卧', '房子新', '房间大', '富人区', '限女生', '限男生', '可养宠物', '风水好', '高层公寓', '环境优', '网速好'],
    tagOption: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
    tagIndex1: -1,
    tagIndex2: -1,
    schoolArr:[],
    schoolIndex1: -1,
    schoolIndex2: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cateIndex = options.cate ? options.cate : 0;
    var cateIndex2 = options.cate2 ? options.cate2 : 0;
    if (cateIndex>0){
      this.allCateChange(cateIndex - 1)
      this.setData({
        indexArray: [cateIndex - 1, cateIndex2]
      })
    }
    var id = options.id ? options.id:0
    lock = false
    var utils = require('../../../utils/util.js');
    var postData = this.data.postData;
    var date = new Date();
    var hour = date.getHours()
    var minute = date.getMinutes()
    var year = date.getFullYear()
    postData.date = utils.formatDate(new Date())
    postData.time = hour + ':' + minute
    postData.transYear = year
    this.setData({
      postData: postData,
      startDate: utils.formatDate(new Date())
    })
    if(id){
      wx.request({
        url: app.globalData.apiUrl + 'v7/get_post_edit.php?uid=' + app.globalData.uid + '&id=' + id,
        success: res => {
          if (res.data.ret == 1) {
            this.setData({
              pics: res.data.data.pics,
              picIds: res.data.data.picIds,
              picCount: res.data.data.picCount,
              indexArray: res.data.data.indexArray,
              postData: res.data.data.postData,
              moneySign: res.data.data.moneySign,
              tagIndex1: res.data.data.tagIndex1,
              tagIndex2: res.data.data.tagIndex2,
              houseIndex: res.data.data.houseIndex,
              typeIndex: res.data.data.typeIndex,
              modelArray: res.data.data.modelArray,
              tagArr: res.data.data.tagArr,
              tagOption: res.data.data.tagOption,
            })
            this.allCateChange(res.data.data.indexArray[0])
          } else {
            app.showTips(res.data.title, res.data.msg, false);
          }
        }
      })
    }
    var cityArray = app.globalData.cityArray
    var sign = app.globalArray.moneyArray[cityArray[1]]
    var arr = app.globalArray.schoolArray[app.globalData.cityArray[2]]
    if (arr === undefined) {
      arr = ['其他学校周边']
    }
    this.setData({
      moneySign: sign,
      schoolArr: arr
    })
    //区域
    var arr = app.globalArray.areaArray[app.globalData.cityArray[2]]
    if (arr === undefined) {
      arr = { '全部地区': [] }
    }
    var keyArray = Object.keys(arr); 
    for (var i = 0; i < keyArray.length;i++){
      var key = keyArray[i];
      if (arr[key].length==0){
        arr[key]=[key];
      }
    }
    this.setData({
      areaOrgin: arr,
      areaArray: [keyArray, arr[keyArray[0]]]
    })
  },
  onShow() {
    if (app.globalData.areaChange) {
      var postData = this.data.postData;
      postData.area = app.globalData.area
      this.setData({
        area: app.globalData.area,
        postData: postData
      })
      app.globalData.area = '';
      app.globalData.areaChange = false;
    }
  },
  addPic() {
    var that = this;
    var picCount = that.data.picCount
    wx.chooseImage({
      count: 9 - picCount,
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var pics = that.data.pics;
        var picIds = that.data.picIds;
        for (var i = 0; i < tempFilePaths.length;i++){
          var img = tempFilePaths[i];
          pics.push(img);
          wx.uploadFile({
            url: app.globalData.apiUrl + 'upload_pic.php',
            filePath: img,
            name: 'file',
            formData: {
              'uid': app.globalData.uid
            },
            success: res=> {
              if(res.data==0){
                app.showTips('提示', '上传失败', false);
              }else{
                picCount++;
                picIds.push(res.data)
                that.setData({
                  pics: pics,
                  picIds: picIds,
                  picCount: picCount
                });
              }
            }
          })
        }
      }
    })
  },
  delPic(e){
    var index = e.currentTarget.dataset.index;
    var pics = this.data.pics;
    var picIds = this.data.picIds;
    pics.splice(index,1); 
    picIds.splice(index,1); 
    this.setData({
      pics: pics,
      picIds: picIds,
      picCount: picIds.length
    });
  },
  cateChange(e) {
    var v = e.detail.value;
    if (this.data.indexArray != v) {
      this.setData({
        indexArray: v
      })
    }
  },
  houseChange(e) {
    var v = e.detail.value;
    if (this.data.houseIndex != v) {
      this.setData({
        houseIndex: v
      })
    }
  },
  typeChange(e) {
    var v = e.detail.value;
    if (this.data.typeIndex != v) {
      this.setData({
        typeIndex: v
      })
    }
  },
  dayChange(e){
    var v=e.detail.value;
    var day=1;
    if(v==1){
      day=7;
    }else if(v==2){
      day=30;
    }
    var postData = this.data.postData
    postData.topDay = day;
    postData.topPrice = day*10;
    this.setData({
      dayIndex:v,
      postData: postData
    })
    //var money = parseFloat(this.data.price) * this.data.totalCount;
    //money = Math.round(money * 100) / 100;
  },
  columnChange: function (e) {
    if (e.detail.column == 1) {
      return;
    }
    this.allCateChange(e.detail.value)
  },
  allCateChange(v){
    var cateArray = this.data.cateArray
    var cateSecondId = this.data.cateSecondId
    v = this.data.cateId[v]
    v=v-1;
    switch (v) {
    case 0: cateArray[1] = ['求租', '招租']; cateSecondId=[0,1];break;
      case 1: cateArray[1] = ['求购信息', '家居家具', '数码电子', '二手教材', '宠物相关', '服装饰品', '游戏娱乐', '美容护肤', '食品饮料', '宝宝用品', '其它综合', '电器相关']; cateSecondId = [10,0,1,2,3,4,5,6,7,8,9,11]; break;
      case 2: cateArray[1] = ['求职', '招聘']; cateSecondId = [0, 1];break;
      case 3: cateArray[1] = ['求购', '出售']; cateSecondId = [0, 1]; break;
      case 4: cateArray[1] = ['求助问事', '留学移民', '美食天地', '吐槽八卦', '校园联谊', '淘气宝宝', '汽车之家', '家有萌宠', '美妆服饰', '旅游踏青']; cateSecondId = [0, 1,2,3,4,5,6,7,8,9];break;
      case 5: cateArray[1] = ['人找车', '车找人']; cateSecondId = [0, 1]; break;
      case 6: cateArray[1] = ['短租民宿']; cateSecondId = [0];break;
      case 7: cateArray[1] = ['生意转让']; cateSecondId = [0];break;
      case 8: cateArray[1] = ['**项目']; cateSecondId = [0]; break;
      case 9: cateArray[1] = ['宠物相关']; cateSecondId = [0]; break;
      case 10: cateArray[1] = ['二手教材']; cateSecondId = [0];break;
      case 11: cateArray[1] = ['二手房', '新房']; cateSecondId = [0, 1]; break;
      case 12: cateArray[1] = ['同城**']; cateSecondId = [0];break;
      case 13: cateArray[1] = ['家居家具']; cateSecondId = [0]; break;
      case 14: cateArray[1] = ['数码电子']; cateSecondId = [0];break;
      case 15: cateArray[1] = ['求带', '帮带']; cateSecondId = [0, 1]; break;
    }
    this.setData({
      cateArray: cateArray,
      cateSecondId: cateSecondId
    })
  },
  clickSwitch(e) {
    var v = e.currentTarget.dataset.on;
    if (v == 1) {
      v = 0
    } else {
      v = 1
    }
    var postData = this.data.postData
    postData.top = v;
    this.setData({
      postData: postData
    })
  },
  wxPay(){
    wx.request({
      url: app.globalData.apiUrl+'pay.php',
      data: { uid: app.globalData.uid},
      method:'POST',
      success:res=>{
        if (res.data.ret == 1) {
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (res) { },
            'fail': function (res) { },
            'complete': function (res) {
              
            }
          })
        } else {
          app.showTips(res.data.title, res.data.msg, false);
        }
      }
    })
  },
  postClick(){
    if (lock) {
      return
    }
    lock = true;
    if (this.data.postData.title == '') {
      app.showTips('提示', '请输入标题', false)
      lock = false;
      return
    }
    if (this.data.postData.content == '') {
      app.showTips('提示', '请输入内容', false)
      lock = false;
      return
    }
    // if (this.data.pics.length == 0) {
    //   app.showTips('提示', '请选择图片', false)
    //   return
    // }
    if (this.data.postData.address == '' && 1==2) {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userLocation'] || res.authSetting['scope.userLocation'] == undefined) {
            app.showTips('提示', '请选择位置', false)
          } else {
            app.showAuthTips('请先授权获取位置');
          }
        }
      })
      lock = false;
      return
    }    
    // if (this.data.postData.mobile=='') {
    //   app.showTips('提示', '请填写电话号码', false);
    //   lock = false;
    //   return;
    // }
    // var mobileReg = /^[1][0-9]{10}$/;
    // if (!mobileReg.test(this.data.postData.mobile)) {
    //   app.showTips('提示', '手机号有误', false);
    //   return;
    // }
    if (/.*[\u4e00-\u9fa5]+.*$/.test(this.data.postData.wechat)) {
      app.showTips('提示', '请输入正确的微信号', false)
      lock = false;
      return;
    }
    
    var cid = this.data.cateId[this.data.indexArray[0]]
    if ((this.data.postData.area == '' || this.data.postData.area == '请选择区域') && cid != 5 && cid!=16) {
      app.showTips('提示', '请选择区域', false)
      lock = false;
      return
    }
    //标签结合
    var tagOption = this.data.tagOption
    var tagArr = this.data.tagArr
    var tag_str='';
    for (var i = 0; i < tagOption.length;i++){
      var jugle = tagOption[i];
      if (jugle==true){
        if (tag_str==''){
          tag_str = tagArr[i]
        }else{
          tag_str += ','+ tagArr[i]
        }
      }
    }
    var postData = this.data.postData
    //console.log(this.data.indexArray)
    if (this.data.indexArray[0] == 0) {
      if (this.data.houseIndex == 0) {
        app.showTips('提示', '请选择房型', false)
        lock = false;
        return
      }
      if (this.data.typeIndex == 0) {
        app.showTips('提示', '请选择方式', false)
        lock = false;
        return
      }
      postData.tag_str = tag_str;
      postData.house = this.data.houseIndex;
      postData.type = this.data.typeIndex;
      postData.tag1 = '';
      postData.tag2 = '';
      var tagIndex1 = this.data.tagIndex1;
      var tagIndex2 = this.data.tagIndex2;
      if (tagIndex1 == -1 && tagIndex2 != -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex2];
      } else if (tagIndex1 != -1 && tagIndex2 == -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex1];
      } else if (tagIndex1 != -1 && tagIndex2 != -1) {
        postData.tag1 = this.data.tagArr[this.data.tagIndex1];
        postData.tag2 = this.data.tagArr[this.data.tagIndex2];
      }
      postData.school1 = '';
      postData.school2 = '';
      var schoolIndex1 = this.data.schoolIndex1;
      var schoolIndex2 = this.data.schoolIndex2;
      if (schoolIndex1 == -1 && schoolIndex2 != -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex2];
      } else if (schoolIndex1 != -1 && schoolIndex2 == -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex1];
      } else if (schoolIndex1 != -1 && schoolIndex2 != -1) {
        postData.school1 = this.data.schoolArr[this.data.schoolIndex1];
        postData.school2 = this.data.schoolArr[this.data.schoolIndex2];
      }
    }
    if (this.data.indexArray[0] == 5) {
      if (postData.start == '') {
        app.showTips('提示', '请输入出发地', false)
        lock = false;
        return
      }
      if (postData.end == '') {
        app.showTips('提示', '请输入目的地', false)
        lock = false;
        return
      }
      if (postData.peopleNum == '' || postData.peopleNum <= 0) {
        app.showTips('提示', '请输入人数', false)
        lock = false;
        return
      }
      if (postData.linkman == '') {
        app.showTips('提示', '请输入联系人', false)
        lock = false;
        return
      }
    }
    if (this.data.indexArray[0] == 3 && this.data.indexArray[1] == 1) {
      if (postData.transBrand == 0) {
        app.showTips('提示', '请选择品牌', false)
        lock = false;
        return
      }
      if (postData.transModel == 0) {
        app.showTips('提示', '请选择型号', false)
        lock = false;
        return
      }
      // if (postData.transPrice == '' || postData.transPrice <=0) {
      //   app.showTips('提示', '请输入价格', false)
      //   lock = false;
      //   return
      // }
      // if (postData.transSpeed == 0) {
      //   app.showTips('提示', '请选择变速箱', false)
      //   lock = false;
      //   return
      // }
      if (postData.transKm === '') {
        app.showTips('提示', '请输入公里数', false)
        lock = false;
        return
      }
    }
    postData.uid=app.globalData.uid
    postData.pics = this.data.picIds
    postData.cate = this.data.indexArray
    postData.cate[0] = this.data.cateId[postData.cate[0]]
    postData.cate[1] = this.data.cateSecondId[postData.cate[1]]
    postData.moneySign = this.data.moneySign
    wx.request({
      url: app.globalData.apiUrl+'v7/post.php',
      data: postData,
      method:'POST',
      success:res=>{
        if(res.data.ret==1){
          if (res.data.top==1){
            wx.requestPayment({
              'timeStamp': res.data.pay_info.timeStamp,
              'nonceStr': res.data.pay_info.nonceStr,
              'package': res.data.pay_info.package,
              'signType': 'MD5',
              'paySign': res.data.pay_info.paySign,
              'success': function (res) {
                wx.showToast({
                  title: '置顶成功',
                  icon: 'success'
                })
                setTimeout(function(){
                  wx.hideToast()
                  app.globalData.cityChange = true
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                },2000)
                
               },
              'fail': function (res) {
                wx.showToast({
                  title: '取消置顶',
                  icon: 'success'
                })
                setTimeout(function () {
                  wx.hideToast()
                  app.globalData.cityChange = true
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 2000)
               },
              'complete': function (res) {
              }
            })
          }else{
            wx.showToast({
              title: '发布成功',
              icon: 'success'
            })
            setTimeout(function () {
              wx.hideToast()
              app.globalData.cityChange = true
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000)
          }
        }else{
          app.showTips(res.data.title, res.data.msg, false);
          lock = false;
        }
      },
      fail:res=>{
        lock=false;
      }
    })
  },
  chooseLocation(){
    wx.chooseLocation({
      success: res=> {
        var postData=this.data.postData
        postData.address = res.address
        postData.lon = res.longitude
        postData.lat = res.latitude
        this.setData({
          postData: postData
        })
      },
      fail:res=>{
        wx.getSetting({
          success: res => {
            if (!res.authSetting['scope.userLocation'] || res.authSetting['scope.userLocation'] == undefined) {
              app.showAuthTips('请先授权获取位置');
            }
          }
        })
      }
    })
  },
  titleInput(e) {
    var postData = this.data.postData
    postData.title = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  schoolInput(e) {
    var postData = this.data.postData
    postData.school = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  contentInput(e) {
    var postData = this.data.postData
    postData.content = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  mobileInput(e) {
    var postData = this.data.postData
    postData.mobile = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  priceInput(e) {
    var postData = this.data.postData
    postData.price = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  tag1Input(e) {
    var postData = this.data.postData
    postData.tag1 = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  tag2Input(e) {
    var postData = this.data.postData
    postData.tag2 = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  wechatInput(e) {
    var postData = this.data.postData
    postData.wechat = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  selectArea() {
    wx.navigateTo({
      url: '/pages/areaSelect/areaSelect',
    })
  },
  selectTag(e) {
    var v = e.currentTarget.dataset.index
    var tagOption = this.data.tagOption;
    var choose = tagOption[v]
    choose = choose==true?false:true;
    tagOption[v]=choose;
    this.setData({
      tagOption: tagOption
    })
  },
  selectSchool(e) {
    var v = e.currentTarget.dataset.index
    if (this.data.schoolIndex1 == v) {
      this.setData({
        schoolIndex1: -1
      })
    } else if (this.data.schoolIndex2 == v) {
      this.setData({
        schoolIndex2: -1
      })
    } else if (this.data.schoolIndex1 == -1) {
      this.setData({
        schoolIndex1: v
      })
    } else if (this.data.schoolIndex2 == -1) {
      this.setData({
        schoolIndex2: v
      })
    } else {
      app.showTips('提示', '最多选择2个学校', false);
    }
  },
  radioChange(e) {
    var postData = this.data.postData
    postData.personal = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  personalPick(e){
    var postData = this.data.postData
    postData.personal = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  midInput(e) {
    var postData = this.data.postData
    postData.mid = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  startInput(e) {
    var postData = this.data.postData
    postData.start = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  endInput(e) {
    var postData = this.data.postData
    postData.end = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  carTypePick(e){
    var postData = this.data.postData
    postData.carType = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  dateChange(e){
    var postData = this.data.postData
    postData.date = e.detail.value
    this.setData({
      postData: postData
    })
  },
  timeChange(e){
    var postData = this.data.postData
    postData.time = e.detail.value
    this.setData({
      postData: postData
    })
  },
  peopleNumInput(e) {
    var postData = this.data.postData
    postData.peopleNum = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  linkmanInput(e) {
    var postData = this.data.postData
    postData.linkman = e.detail.value;
    this.setData({
      postData: postData
    })
  },
  transYearChange(e){
    var postData = this.data.postData
    postData.transYear = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transTypePick(e) {
    var postData = this.data.postData
    postData.transType = e.currentTarget.dataset.value
    this.setData({
      postData: postData
    })
  },
  transSpeedChange(e){
    var postData = this.data.postData
    postData.transSpeed = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transPriceInput(e){
    var postData = this.data.postData
    postData.transPrice = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transKmInput(e){
    var postData = this.data.postData
    postData.transKm = e.detail.value
    this.setData({
      postData: postData
    })
  },
  transBrandChange(e) {
    var postData = this.data.postData
    var allModelArray = this.data.allModelArray
    var modelArray = allModelArray[e.detail.value]
    postData.transBrand = e.detail.value
    postData.transModel= 0
    this.setData({
      postData: postData,
      modelArray: modelArray
    })
  },
  transModelChange(e) {
    var postData = this.data.postData
    postData.transModel = e.detail.value
    this.setData({
      postData: postData
    })
  },
  areaChange(e) {
    var v=e.detail.value;
    var arr = this.data.areaOrgin;
    var keyArray = Object.keys(arr);
    var area=arr[keyArray[v[0]]][v[1]];
    var postData = this.data.postData
    postData.area = area
    this.setData({
      postData: postData,
      areaIndex:v
    })
  },
  areaColumnChange(e) {
    if (e.detail.column == 1) {
      return;
    }
    var v=e.detail.value;
    var arr = this.data.areaOrgin;
    var keyArray = Object.keys(arr);
    this.setData({
      areaArray: [keyArray, arr[keyArray[v]]]
    })
  },
  weekChange(e){
    var v = e.detail.value;
    var postData = this.data.postData
    postData.week = v
    this.setData({
      postData: postData
    })
  }
})