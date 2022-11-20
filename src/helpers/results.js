import { birdsData } from "../constants/birds-data";


class ResultsService {
  set data(value) {
    this._data = value;
  }

  get data() {
    return {
      ...this._data,
      maxScore: this.getMaxScore(),
    };
  }

  getMaxScore() {
    return birdsData.length * 5;
  }
}

export const resultsService = new ResultsService();