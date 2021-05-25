// libs
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import Chart from 'chart.js';
import 'chartjs-plugin-datalabels';

// const
import {StatsFilter} from '../const';

// utils
import {getRatingTitle} from '../utils/rating';
import {getOnlyNumeralTime} from '../utils/time';
import {getStats} from '../utils/stats';

//view
import SmartView from './smart';


const BAR_HEIGHT = 50;
dayjs.extend(isToday);

const renderStatisticChart = (statisticCtx, stats) => {

  const genres = Object.keys(stats.genres);
  const numberOfGenres = Object.values(stats.genres);

  return new Chart(statisticCtx, {
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: numberOfGenres,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          dataset: {
            barThickness: 24,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticFiltersItemTemplate = (title, filter, currentFilter) => {

  const isChecked = currentFilter === filter ? 'checked' : '';

  return (
    `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter}" value=${filter} ${isChecked}>
    <label for="statistic-${filter}" class="statistic__filters-label">${title}</label>`
  );
};

const createUserStatisticTemplate = ({stats, currentFilter}, rank) => {

  const {watchedCount = 0, watchedTime = 0, genres} = stats;
  const {hours = 0, minutes = 0} = getOnlyNumeralTime(watchedTime);
  const [topGenre] = watchedCount > 0
    ? Object.entries(genres).reduce((acc, curr) => acc[1] > curr[1] ? acc : curr)
    : [''];

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        ${createStatisticFiltersItemTemplate('All time', 'all-time', currentFilter)}
        ${createStatisticFiltersItemTemplate('Today', 'today', currentFilter)}
        ${createStatisticFiltersItemTemplate('Week', 'week', currentFilter)}
        ${createStatisticFiltersItemTemplate('Month', 'month', currentFilter)}
        ${createStatisticFiltersItemTemplate('Year', 'year', currentFilter)}

      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${watchedCount} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours} <span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${topGenre}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
};

export default class UserStatistic extends SmartView {
  constructor(films) {
    super();

    this._films = films;
    this._filmsCount = this._films.length;
    this._rank = getRatingTitle(this._filmsCount);

    this._state = {
      currentFilter: StatsFilter.ALL_TIME,
      stats: this._filmsCount > 0 ? getStats(this._films) : this._films,
    };

    this._filtersInputChangeHandler = this._filtersInputChangeHandler.bind(this);

    this._setChart();
    this._setInnerHandlers();
  }

  getTemplate() {
    return createUserStatisticTemplate(this._state, this._rank);
  }

  restoreHandlers() {
    this._setChart();
    this._setInnerHandlers();
  }

  _getFiltredStats(films, filter) {
    switch(filter) {
      case StatsFilter.ALL_TIME:
        return getStats(films);
      case StatsFilter.TODAY:
        return getStats(films.filter((film) => dayjs(film.watchingDate).isToday()));
      case StatsFilter.WEEK:
      case StatsFilter.MONTH:
      case StatsFilter.YEAR:
        return getStats(films.filter((film) => dayjs(film.watchingDate) > dayjs().subtract(1, filter)));
    }
  }

  _setChart() {
    if (this._filmsCount > 0) {
      const {stats} = this._state;
      const genresTotal = Object.keys(stats.genres).length;
      const statisticCtx = this.getElement().querySelector('.statistic__chart');
      statisticCtx.height = BAR_HEIGHT * genresTotal;

      renderStatisticChart(statisticCtx, stats);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.statistic__filters')
      .addEventListener('change', this._filtersInputChangeHandler);
  }

  _filtersInputChangeHandler(evt) {
    evt.preventDefault();

    const updatedFilter = evt.target.value;

    this.updateData({
      currentFilter: updatedFilter,
      stats: this._getFiltredStats(this._films, updatedFilter),
    });
  }
}
