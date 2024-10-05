import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mybarber/src/dashboard/domain/model/statistic_model.dart';
import 'package:mybarber/src/dashboard/providers/statistic_provider.dart';
import 'package:mybarber/src/utils/env.dart';
import 'package:provider/provider.dart';

class BarChartReceipt extends StatefulWidget {
  const BarChartReceipt({Key? key}) : super(key: key);

  @override
  _BarChartState createState() => _BarChartState();
}

class _BarChartState extends State<BarChartReceipt> {
  List<StatisticModel> statisticData = [];

  @override
  void initState() {
    super.initState();

    fetchStatistic();
  }

  void fetchStatistic() async {
    final provider = Provider.of<StatisticProvider>(context, listen: false);
    await provider.loadStatistic();
    setState(() {
      statisticData = provider.statisticData;
    });
  }

  @override
  Widget build(BuildContext context) {
    return AspectRatio(
      aspectRatio: 1.6,
      child: _BarChart(statisticData: statisticData),
    );
  }
}

class _BarChart extends StatelessWidget {
  final List<StatisticModel> statisticData;

  const _BarChart({required this.statisticData});

  @override
  Widget build(BuildContext context) {
    return BarChart(
      BarChartData(
        barTouchData: barTouchData,
        titlesData: titleData,
        borderData: borderData,
        barGroups: barGroups,
        gridData: const FlGridData(show: false),
        alignment: BarChartAlignment.spaceAround,
        maxY: getMaxY(),
      ),
    );
  }

  double getMaxY() {
    if (statisticData.isNotEmpty) {
      double maxData = statisticData
          .map((e) => e.data.toDouble())
          .reduce((a, b) => a > b ? a : b);
      return maxData * 1.2;
    }
    return 10;
  }

  BarTouchData get barTouchData => BarTouchData(
      enabled: false,
      touchTooltipData: BarTouchTooltipData(
          getTooltipColor: (group) => Colors.transparent,
          tooltipPadding: EdgeInsets.zero,
          tooltipMargin: 8,
          getTooltipItem: (
            BarChartGroupData group,
            int groupIndex,
            BarChartRodData rod,
            int rodIndex,
          ) {
            return BarTooltipItem(rod.toY.round().toString(),
                const TextStyle(color: mainColor, fontWeight: FontWeight.bold));
          }));

  //render title chart
  Widget getTitles(double value, TitleMeta meta) {
    const style = TextStyle(
      color: Colors.blue,
      fontWeight: FontWeight.bold,
      fontSize: 14,
    );
    String text;
    switch (value.toInt()) {
      case 0:
        text = 'Sn';
        break;
      case 1:
        text = 'Mn';
        break;
      case 2:
        text = 'Te';
        break;
      case 3:
        text = 'Wd';
        break;
      case 4:
        text = 'Tu';
        break;
      case 5:
        text = 'Fr';
        break;
      case 6:
        text = 'St';
        break;
      default:
        text = '';
        break;
    }
    return SideTitleWidget(
      axisSide: meta.axisSide,
      space: 4,
      child: Text(
        text,
        style: style,
      ),
    );
  }

  FlTitlesData get titleData => FlTitlesData(
        show: true,
        bottomTitles: AxisTitles(
          sideTitles: SideTitles(
            showTitles: true,
            reservedSize: 30,
            getTitlesWidget: getTitles,
          ),
        ),
        leftTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        topTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
        rightTitles: const AxisTitles(
          sideTitles: SideTitles(showTitles: false),
        ),
      );

  FlBorderData get borderData => FlBorderData(
        show: false,
      );

  LinearGradient get _barsGradient => const LinearGradient(
        colors: [mainColor, Colors.blue],
        begin: Alignment.bottomCenter,
        end: Alignment.topCenter,
      );

  //render data chart
  List<BarChartGroupData> get barGroups => [
        for (int i = 0; i < statisticData.length; i++)
          BarChartGroupData(x: i, barRods: [
            BarChartRodData(
              toY: statisticData[i].data.toDouble(),
              gradient: _barsGradient,
            )
          ], showingTooltipIndicators: [
            0
          ]),
      ];
}
