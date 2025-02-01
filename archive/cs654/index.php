<?php

// Specify the number of queries you would want to store
$cacheSize = 50;

function writeCache($op, $first, $second, $answer){
    $text = $op."\t".$first."\t".$second."\t".$answer."\n";
    if(!file_exists("cache.txt")){
        $cache = fopen("cache.txt", "w") or die("Unable to create and open cache to write");
    }
    else{
        $cache = fopen("cache.txt", "a") or die("Unable to open cache to write!");
    }
    fwrite($cache, $text);
    fclose($cache);
}

function updateCache($cache, $line, $op, $first, $second, $answer){
    $cache = "cache.txt";
    $contents = file_get_contents($cache);
    $contents = str_replace($line, '', $contents);
    file_put_contents($cache, $contents);
    //fseek($cache, -1, SEEK_END);
    writeCache($op, $first, $second, $answer);
}

if( ($_GET["first"] || ($_GET["first"] == 0)) && ($_GET["second"] || ($_GET["second"] == 0)) && $_GET["op"] ) {
    $first = floatval(utf8_decode($_GET["first"]));
    $second = floatval(utf8_decode($_GET["second"]));
    $op = utf8_decode($_GET["op"]);

    // Here we only search if a similar query exists in the cache
    $cacheSize++; // to deal with the error

    if(file_exists("cache.txt")){
        $cache = fopen("cache.txt", "r+") or die("Unable to open file");
            // Logic to carry out the search
            $it = 0;
            while(($it < $cacheSize) && (!feof($cache))) {
                $line = fgets($cache);
                list($Nop, $Nfirst, $Nsecond, $answer) = sscanf($line, "%s\t%lf\t%lf\t%lf");
                if($Nop == $op){
                    if(($op == "-") || ($op == "/") || ($op == "%")){
                        if(($Nfirst == $first) && ($Nsecond == $second)){
                            echo $answer;
                            fclose($cache);
                            updateCache($cache, $line, $op, $first, $second, $answer);
                            exit();
                        }
                    }
                    else if(($op == "+") || ($op == "*")){
                        if((($Nfirst == $first) && ($Nsecond == $second))
                        || (($Nfirst == $second) && ($Nsecond == $first))){
                            echo $answer;
                            fclose($cache);
                            updateCache($cache, $line, $op, $first, $second, $answer);
                            exit();
                        }
                    }
                }
                $it++;
            }
        //fclose($cache);
    }
    if($it == $cacheSize){
        $contents = file_get_contents("cache.txt");
        $count = 0;
        while($contents[$count] != "\n"){
            $count++;
        }
        file_put_contents("cache.txt", substr($contents, $count+1));
    }

    // Here we actually calculate the answer for the query
    if($op == "+"){
        $answer = $first+$second;
    }
    else if($op == "-"){
        $answer = $first-$second;
    }
    else if($op == "*"){
        $answer = $first*$second;
    }
    else if($op == "/"){
        if($second == 0){
            $answer = "Division by zero is undefined";
        }
        else{
            $answer = $first/$second;
        }
    }
    else if($op == "%"){
        if($second == 0){
            $answer = "Division by zero is undefined";
        }
        else{
            $answer = $first%$second;
        }
    }

    // reporting the answer
    echo $answer;
    writeCache($op, $first, $second, $answer);
    exit();
}
else{
    echo "Welcome to CS654A:Software Architecture";
}
?>
