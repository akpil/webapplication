<!DOCTYPE html>
<html>
<head>
    <title>Dictionary</title>
    <meta charset="utf-8" />
    <link href="dictionary.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>My Dictionary</h1>
<!-- Ex. 1: File of Dictionary -->
    <?php $filename = 'dictionary.tsv';
            $fileptr = file($filename);
            $line = array();
            foreach($fileptr as $row){
                array_push ($line, $row);
            }
            
            
    ?>
    <p>
        My dictionary has <?=sizeof($fileptr)?> total words
        and
        size of <?=filesize($filename)?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's words</h2>
<!-- Ex. 2: Today’s Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByNumber($listOfWords, $numberOfWords){
                $resultArray = array();
                $temparr = array();
                foreach($listOfWords as $row)
                {
                    array_push($temparr, $row);
                }
                shuffle($temparr);
                for($i=0; $i < $numberOfWords; $i++)
                {
                    $var = strtok($temparr[$i], "\t");
                    $var .= ' - ';
                    $var .= strtok("\t");
                    array_push($resultArray, $var);
                }
                return $resultArray;
            }
            $todaysWords = getWordsByNumber($line, 3);
?>
            <ol>
<?php    
            foreach($todaysWords as $row)
            {?>
                <li><?=$row;?></li>
        <?php    }
        ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Words</h2>
<!-- Ex. 3: Searching Words & Ex 6: Query Parameters -->
        <?php
            function getWordsByCharacter($listOfWords, $startCharacter){
                $resultArray = array();
                foreach ($listOfWords as $row)
                {
                    if($row[0] == $startCharacter)
                    {
                        array_push($resultArray, $row);
                    }
                }
                return $resultArray;
            }
            $searchChar = 'D'; 
            $res = getWordsByCharacter($line, $searchChar);
        ?>
        <p>
            Words that started by <strong><?=$searchChar?></strong> are followings :
        </p>
        <ol>
            <?php
                foreach($res as $row)
                {?>
                    <li><?=$row;?></li>
            <?    }
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Words</h2>
<!-- Ex. 4: List of Words & Ex 6: Query Parameters -->
        <?php
            
            function getWordsByOrder($listOfWords, $orderby){
                $resultArray = array();
                foreach($listOfWords as $row)
                {
                    array_push($resultArray, $row);
                }
                if($orderby == 0)
                {
                    
                    
                }
                else
                {
                    arsort($resultArray);
                }
                return $resultArray;
            }
        ?>
        <p>
            All of words ordered by <strong>alphabetical order</strong> are followings :
        </p>
        <ol>
            <?php
                $order = 0;
                $lst = getWordsByOrder($line, 1);
                foreach($lst as $words)
                {
                    ?><li<?
                    $var = strtok($words, "\t");
                    if (strlen($var)>6)
                    {
                          ?> class="long"><?
                    }
                    else
                    {
                        ?>><?
                    }
                    $var .= ' - ';
                    $var .= strtok("\t");
                    ?><?=$teg.$var?></li><?
                }
            ?>
            
        </ol>
    </div>
    <div class="section">
        <h2>Adding Words</h2>
        <?php
            $newWord = $_GET['newWord'];
            $meaning = $_GET['meaning'];
            $resmessage = '';
            print $newWord.'$';
            print $meaning."&";
            if((isset($newWord) || isset($meaning))&& ($newWord != ' ') && ($meaning!=' '))
            {
                echo "$$";
                $ressmessage = "Input word or meaning of the word doesn't exist.";
            }
            else{
                echo '##';
                file_put_contents ($filename, $newWord."\t".$meaning, FILE_APPEND);
                $ressmessage = "Adding a word is success!";
            }
        ?>
        <p><?=$ressmessage?></p>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>