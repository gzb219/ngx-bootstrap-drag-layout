import {Component, OnInit} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

declare var $: any;

@Component({
  selector: 'app-drag',
  templateUrl: './drag.component.html',
  styleUrls: ['./drag.component.css']
})
export class DragComponent implements OnInit {
  private headers = new Headers({'Accept': '*/*'});
  private options = new RequestOptions({headers: this.headers});
  private headersJson = new Headers({'Content-Type': 'application/json'});
  private optionsJson = new RequestOptions({headers: this.headersJson});

  private json: object;
  private str: string;

  constructor(private http: Http) {
  }

  ngOnInit() {

    this.loadPageDate('api/page');

    const that = this;
    $('#saveData').on('click', function () {

      that.saveData('api/save', that.jsonWrite('demo'));
    });
  }

  public jsonRead = function (dataJson) {
    const length = 0;
    const strHead = '<div class=\'view\'><div class=\'row-fluid clearfix\'>';

    const strFoot = '</div></div>';
    let str = '';
    dataJson.forEach((element, i) => {
      if (Number(element.width) !== 0 && !isNaN(Number(element.width))) {
        str += '<div class=\'span' + element.width + ' column ui-sortable\'>';
      }
      element.cptList.forEach(n => {

        const li = $('#elmComponents').find('app-' + n).parents('.ui-draggable').html();
        str += '<div class=\'box box-element ui-draggable\'>' + li + '</div>';
      });
      str += '</div>';
    });
    return strHead + str + strFoot;
  };
  public jsonWrite = function (className: string) {
    const jsonArr = [];
    $('.' + className).find('.column').each(function (index, element) {
      const row = {width: '0', cptList: []};
      row.width = element.className.split('span')[1].split('')[0];

      $(element).find('.ui-draggable').each((i, n) => {

        const strElement = $(n).find('.view').html().split('-')[1].split('_')[0];

        row.cptList.push(strElement.substring(0, strElement.length - 1));
      });
      jsonArr.push(row);
    });
    console.log(jsonArr);
    return jsonArr;
  };

  // commen post 请求
  public postHttp(url: string, body: Array<Object>): Observable<any> {
    return this.http
      .post(url, body, this.optionsJson)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  public getHttp(url: string): Observable<any> {
    return this.http
      .get(url, {})
      .map((res: Response) => {
        return res.json();
      });
  }

  // 读取数据
  public loadPageDate(url: string) {
    return this.getHttp(url).subscribe(
      res => {
        // console.log( "读取数据成功",res );
        this.str = '<div class="lyrow ui-draggable" style="display: block;">'
          + '<a class="remove label label-important" href="#close">'
          + '<i class="icon-remove icon-white"></i>删除</a>'
          + '<span class="drag label">'
          + '<i class="icon-move">'
          + '</i>拖动</span>'
          + '<div class="preview">'
          + '<input type="text" value="12">'
          + '</div>' + this.jsonRead(res) + '</div>';
        this.json = {
          'count': 2,
          'list': [
            '',
            this.str
          ]
        };
        localStorage.setItem('layoutdata', JSON.stringify(this.json));
      },
      error => {
        console.log(error);
      }
    );
  }

  // 获取数据函数
  public saveData(url: string, body: Array<Object>) {
    return this.postHttp(url, body).subscribe(
      res => {
        if (res.result === '200') {
          alert('保存成功');
        }
      },
      error => {
        // console.log( error );
      }
    );
  }
}
