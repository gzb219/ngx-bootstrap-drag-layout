import {Injectable} from '@angular/core';

declare var $: any;

@Injectable()
export class JsonResolveService {

  public jsonRead = function (dataJson) {
    const length = 0;
    const strHead = '<div class=\'view\'><div class=\'row-fluid clearfix\'>';
    // var strMid = ' column ui-sortable'>';
    const strFoot = '</div></div>';
    const str = '';
    dataJson.forEach((element, i) => {
      if (Number(element.width) !== 0 && !isNaN(Number(element.width))) {
        this.str += '<div class=\'span' + element.width + ' column ui-sortable\'>';
      }
      element.cptList.forEach(element => {
        // str += '<app-'+ element + '>' + '</app-'+ element + '>';
        this.str += '<div class=\'box box-element ui-draggable\'>' + element + '</div>';
      });
      this.str += '</div>';
    });
    return strHead + str + strFoot;
  };
  public jsonWrite = function (className: string) {
    const jsonArr = [];
    $('.' + className).find('.column').each(function (index, element) {
      const row = {width: '0', cptList: []};
      row.width = element.className.split('span')[1].split('')[0];
      $(element).find('.ui-draggable').each((index, element) => {
        row.cptList.push(element.innerHTML);
      });
      jsonArr.push(row);
    });
    return jsonArr;
  };

  constructor() {
  }
}
