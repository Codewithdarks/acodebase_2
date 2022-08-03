<?php

namespace App\Http\Controllers;

use App\Models\orders;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;

class DashboardController extends Controller
{
    /**
     * Declaring to make less load on server.
     *
     * @var Collection
     */
    private Collection $orders;


    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->orders = orders::all();
    }

    /**
     * Show the application dashboard.
     *
     * @return Application|Factory|View
     */
    public function index() {
        return view('pages.dashboard');
    }

    /**
     * Returning the arrays for chart rendering.
     *
     * @param $type
     * @return array|array[]
     */
    public function ChartDataResponse($type, $from='app') {
        $week = '1'; $monthOne = '2'; $monthSix = '3'; $year = '4'; $yearly = '5';
        if ($type == $week) {
            return $this->WeeklyReportCalculation($from);
        } elseif ($type == $monthOne) {
            return $this->SingleMonthWeeklyReport($from);
        } elseif ($type == $monthSix) {
            return $this->GettingValues('6', 'months', 'M', $from);
        } elseif ($type == $year) {
            return $this->GettingValues('12', 'months', 'M', $from);
        } elseif ($type == $yearly) {
            return $this->GettingValues('7', 'years', 'Y', $from);
        } else {
            return $this->WeeklyReportCalculation($from);
        }
    }

    /**
     * Weekly Report Rendering
     *
     * @return array|array[]
     */
    private function WeeklyReportCalculation($from) {
        $start = $start_date = date('Y-m-d');
        $i = 0;
        $data = array();
        while ($i < '7') {
            $data['intervals'][] = date('l', strtotime($start_date));
            $data['orders'][] = $this->orders->where('order_from', '=', $from)->whereBetween('created_at', [$start_date." 00:00:00", $start_date." 23:59:59"])->count();
            $end = $start_date = date('Y-m-d', strtotime('-1 days', strtotime($start_date)));
            $i++;
        }
        /** @var integer $end */
        return $this->ReturningTheDashboardStats($data, $start, $end, $from);
    }

    /**
     * One month report rendering in weeks.
     *
     * @return array[]
     */
    private function SingleMonthWeeklyReport($from) {
        $start = $start_date = date('Y-m-d');
        $i = 0;
        $data = array();
        while ($i < '4') {
            $end_date = date('Y-m-d', strtotime('-1 weeks', strtotime($start_date)));
            $data['intervals'][] = 'Week '.round(4-$i);
            $data['orders'][] = $this->orders->where('order_from', '=', $from)->whereBetween('created_at', [$end_date." 00:00:00", $start_date." 23:59:59"])->count();
            $end = $start_date = date('Y-m-d', strtotime('-1 weeks', strtotime($start_date)));
            $i++;
        }
        /** @var integer $end */
        return $this->ReturningTheDashboardStats($data, $start, $end, $from);
    }

    /**
     * Returning Common Type of Statistics Values
     *
     * @param $qty - is the quantity of numbers of data we want.
     * @param $val - is the value to put in strtotime to get end_Date in calculations.
     * @param $interval - to get the intervals name of the value either Day, Month, Year etc.
     * @return mixed
     */
    private function GettingValues($qty, $val, $interval, $from) {
        $start = $start_date = date('Y-m-d');
        $i = 0;
        $data = array();
        while ($i < $qty) {
            $end_date = date('Y-m-d', strtotime('-1 '.$val, strtotime($start_date)));
            $data['intervals'][] = date($interval, strtotime($start_date));
            $data['orders'][] = $this->orders->where('order_from', '=', $from)->whereBetween('created_at', [$end_date." 00:00:00", $start_date." 23:59:59"])->count();
            $end = $start_date = $end_date;
            $i++;
        }
        /** @var integer $end */
        return $this->ReturningTheDashboardStats($data, $start, $end, $from);
    }

    /**
     * Returning the Dashboard Values of Cards
     *
     * @param $data
     * @param $start
     * @param $end
     * @return mixed
     */
    private function ReturningTheDashboardStats($data, $start, $end, $from) {
        $count = $this->orders->where('order_from', '=', $from)->whereBetween('created_at', [$end." 00:00:00", $start." 23:59:59"])->count();
        $sum = $this->orders->where('order_from', '=', $from)->whereBetween('created_at', [$end." 00:00:00", $start." 23:59:59"])->sum('total_price');
        if ($count == 0){
            $data['average'] = 0;
        } else {
            $data['average'] = round($sum/$count);
        }
        $data['net_sales'] = round($sum);
        $data['count'] = $count;
        return $data;
    }
}
