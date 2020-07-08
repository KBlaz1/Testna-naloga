
export class Column {
  name: string;
  reverse: boolean;
  arrow: string;
  primary: boolean;

  constructor(name: string, reverse: boolean) {
    this.name = name;
    this.reverse = reverse;
  }

  public changeReverseValue() {
    switch (this.reverse) {
      case (null):
        this.reverse = false;
        this.arrow = "▲"
        break;
      case (false):
        this.reverse = true;
        this.arrow = "▼"
        break;
      case (true):
        this.reverse = null;
        this.arrow = ""
    }
  }

  public selectArrow() {
    switch (this.reverse) {
      case (false):
        this.arrow = "▲";
        break;
      case (true):
        this.arrow = "▼"
        break;
      case (null):
        this.arrow = "";
    }
  }
}

export interface IcolumnToJson {
  layout: string;
  column: string;
  descending: boolean;
}
