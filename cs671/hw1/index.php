<?php
?>
<html>
<head>
<title>NLP: Avikalp's HW1</title>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script>
$(document).ready(function(){
    $("#hindi_full").hide();
    $("#hindi_button_compact").hide();
    $("#sanskrit_full").hide();
    $("#sanskrit_button_compact").hide();
    $("#hindi_button").click(function(){
        $("#hindi_compact").hide();
        $("#hindi_full").show();
        $("#hindi_button_compact").show();
        $("#hindi_button").hide();
    });
    $("#hindi_button_compact").click(function(){
        $("#hindi_compact").show();
        $("#hindi_full").hide();
        $("#hindi_button_compact").hide();
        $("#hindi_button").show();
    });
    $("#sanskrit_button").click(function(){
        $("#sanskrit_compact").hide();
        $("#sanskrit_full").show();
        $("#sanskrit_button_compact").show();
        $("#sanskrit_button").hide();
    });
    $("#sanskrit_button_compact").click(function(){
        $("#sanskrit_compact").show();
        $("#sanskrit_full").hide();
        $("#sanskrit_button_compact").hide();
        $("#sanskrit_button").show();
    });
});
</script>
<center><h1>CS671A: Introduction to Natural Language Processing</h1>
<h2>Homework-1</h2></center>
</head>
<body>
<ol>
<li><h3>For Hindi</h3>
<h4>Karambhumi - by Premchand</h4>
<!--<img src="final_submission/plot_hindi.png" /></br>-->
<button id="hindi_button">Expand to see syllable level</button>
<button id="hindi_button_compact">Shrink to see trend</button>
<style>

.chart rect {
      fill: steelblue;
}
.chart rect:hover {
    fill: brown;
}
.chart text {
    fill: white;
    font: 15px sans-serif;
    text-anchor: end;
}
.axis text {
    fill: black;
    font: 10px sans-serif;
}

.axis path,
.axis line {
    fill: none;
    stroke: #000;
    shape-rendering: crispEdges;
}

.x.axis path {
      display: none;
}
</style>
<?php 
$myFile = fopen( "log_data_hindi_corpus.txt", "r" ) or die( "Unable to open file!" );
$data = fread( $myFile, filesize( "log_data_hindi_corpus.txt" ) );
$data_array = split( "\n", $data );
?>
<div id="hindi_compact" style="margin:30px">
    <svg class="chart" height="450" width="1000">
        <g class="y axis">
            <path class="domain" d="M-6,0H0V450H"></path>
            <text transform="rotate(-90)" y="6" dy=".71em" style="text-anchor: end;" >log(Frequency)</text>
        </g>
    <?php
    $count = 20;
    foreach( $data_array as $data_row )
    {
        $data_point = split( "\t", $data_row );
        ?>
        <g transform="translate(<?php echo $count.", ".(450 - $data_point[1]*50) ?>)">
            <rect height="<?php echo $data_point[1]*50 ?>" width="1"></rect>
            <text x="1" y="<?php echo $data_point[1]*50+40 ?>" dy=".35em"><?php echo $data_point[0] ?></text>
        </g>
        <?php
        $count += 1;
        }
    ?>
    </svg>
</div>
<div id="hindi_full" style="margin:30px">
    <svg class="chart" height="450" width="25000">
        <g class="y axis">
            <path class="domain" d="M-6,0H0V450H"></path>
            <text transform="rotate(-90)" y="6" dy=".71em" style="text-anchor: end;" >log(Frequency)</text>
        </g>
    <?php
    $count = 20;
    foreach( $data_array as $data_row )
    {
        $data_point = split( "\t", $data_row );
        ?>
        <g transform="translate(<?php echo $count.", ".(450 - $data_point[1]*50) ?>)">
            <rect height="<?php echo $data_point[1]*50 ?>" width="24"></rect>
            <text x="20" y="<?php echo $data_point[1]*50 - 20 ?>" dy=".35em"><?php echo $data_point[0] ?></text>
        </g>
        <?php
        $count += 25;
        }
    ?>
    </svg>
</div>
<?php
fclose($myFile);
?>
This is the plot of frequencies of the <a href="data_hindi_corpus.txt">1000 most-frequent syllables</a> in <a href="hindi_corpus.txt">this</a> corpus, which is basically a novel written by Premchand.</br>
<a href="bigramData_hindi_corpus.txt">This</a> is the list of the top bigrams in the same corpus, with their frequencies.

<li><h3>For Sanskrit</h3>
<h4>Mahabhashyam - Sri Rudradhara Jha</h4>
<!--<img src="final_submission/plot_sanskrit.png" /></br>-->
<button id="sanskrit_button">Expand to see syllable level</button>
<button id="sanskrit_button_compact">Shrink to see trend</button>
<?php 
$myFile = fopen( "log_data_sanskrit_corpus.txt", "r" ) or die( "Unable to open file!" );
$data = fread( $myFile, filesize( "log_data_hindi_corpus.txt" ) );
$data_array = split( "\n", $data );
?>
<div id="sanskrit_compact" style="margin:30px">
    <svg class="chart" height="450" width="1000">
        <g class="y axis">
            <path class="domain" d="M-6,0H0V450H"></path>
            <text transform="rotate(-90)" y="6" dy=".71em" style="text-anchor: end;" >log(Frequency)</text>
        </g>
    <?php
    $count = 20;
    foreach( $data_array as $data_row )
    {
        $data_point = split( "\t", $data_row );
        ?>
        <g transform="translate(<?php echo $count.", ".(450 - $data_point[1]*50) ?>)">
            <rect height="<?php echo $data_point[1]*50 ?>" width="1"></rect>
            <text x="1" y="<?php echo $data_point[1]*50 + 40 ?>" dy=".35em"><?php echo $data_point[0] ?></text>
        </g>
    <?php
        $count += 1;
    }
    ?>
    </svg>
</div>
<div id="sanskrit_full" style="margin:30px">
    <svg class="chart" height="450" width="25000">
        <g class="y axis">
            <path class="domain" d="M-6,0H0V450H"></path>
            <text transform="rotate(-90)" y="6" dy=".71em" style="text-anchor: end;" >log(Frequency)</text>
        </g>
    <?php
    $count = 20;
    foreach( $data_array as $data_row )
    {
        $data_point = split( "\t", $data_row );
        ?>
        <g transform="translate(<?php echo $count.", ".(450 - $data_point[1]*50) ?>)">
            <rect height="<?php echo $data_point[1]*50 ?>" width="24"></rect>
            <text x="20" y="<?php echo $data_point[1]*50 - 20 ?>" dy=".35em"><?php echo $data_point[0] ?></text>
        </g>
    <?php
        $count += 25;
    }
    ?>
    </svg>
</div>
<?php
fclose($myFile);
?>
This is the plot of frequencies of the <a href="data_sanskrit_corpus.txt">1000 most-frequent syllables</a> in <a href="sanskrit_corpus.txt">this</a> corpus, which is basically a novel written by Premchand.</br>
<a href="bigramData_sanskrit_corpus.txt">This</a> is the list of the top bigrams in the same corpus, with their frequencies.
<br></ol>
Below you can find similar links to some other corpi:</br>
<table border=1 style="width:100%">
    <tr>
        <th>Corpus</th>
        <th>Top 1000 syllables</th>
        <th>Top 1000 syllable-bigrams</th>
    </tr>
    <tr>
        <td><a href="hwiki.txt">Hwiki</a></td>
        <td><a href="data_hwiki.txt">Syllables</a></td>
        <td><a href="bigramData_hwiki.txt">Syllable-Bigrams</a></td>
    </tr>
    <tr>
        <td><a href="bgita.txt">Bgita.txt(Contains Devanagri and Latin-devanagri scripts)</a></td>
        <td><a href="data_bgita.txt">Syllables(both devanagri and latin-devanagri)</a></td>
        <td><a href="bigramData_bgita.txt">Bigrams(both devanagri and latin-devanagri)</a></td>
    </tr>
    <tr>
        <td><a href="bhagwad_gita.txt">Bhagwad Gita (some of the characters are absent from the document)</a></td>
        <td><a href="data_bhagwad_gita.txt">Syllables</a></td>
        <td><a href="bigramData_bhagwad_gita.txt">Syllable-Bigrams</a></td>
    </tr>
</table>
<br/>
<hline>
<br/>
<b>Update (10Aug2015):</b>To download the code used to generate these file, click <a href="https://github.com/avikalpg/avikalpg.github.io/tree/master/cs671/hw1/code">here</a>.
</body>
</html>
