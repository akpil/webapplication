<!DOCTYPE html>
<html>
	<head>
		<title>Grade Store</title>
		<link href="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/pResources/gradestore.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		
		<?php
		# Ex 4 : 
		# Check the existance of each parameter using the PHP function 'isset'.
		# Check the blankness of an element in $_POST by comparing it to the empty string.
		# (can also use the element itself as a Boolean test!)
        $checkbox = ($_POST['cse326'] == 'on')||($_POST['cse107'] == 'on')||($_POST['cse603'] == 'on')||($_POST['cse870'] == 'on');
		if (!$checkbox || !isset($_POST['cardtype']) || ($_POST['name'] == "") || ($_POST['id'] == "") || ($_POST['cardnum'] == "")){
		?>

			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't fill out the form completely. <a href="gradestore.html">Try again?</a>?</p>

		<?php
		# Ex 5 : 
		# Check if the name is composed of alphabets, dash(-), ora single white space./([a-zA-Z]\-{0,1}[a-zA-Z])+/s{1}([a-zA-Z]\-{0,1}[a-zA-Z])*/
		} elseif (!preg_match("/^([a-zA-Z]+\-{0,1}[a-zA-Z]*)+\s{0,1}([a-zA-Z]+\-{0,1}[a-zA-Z]*)*[a-zA-Z]$/",$_POST['name'])) { 
		?>

			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid name. <a href="gradestore.html">Try again?</a>?</p>

		<?php
		# Ex 5 : 
		# Check if the credit card number is composed of exactly 16 digits.
		# Check if the Visa card starts with 4 and MasterCard starts with 5. 
        } elseif (!preg_match("/^(4|5)[0-9]{15}/",$_POST['cardnum'])||(($_POST['cardnum'][0]==4 && $_POST['cardtype'] == 'master')||($_POST['cardnum'][0]==5 && $_POST['cardtype'] == 'visa'))) {
		?>

			Display the below error message : 
			<h1>Sorry</h1>
			<p>You didn't provide a valid credit card number. <a href="gradestore.html">Try again?</a>?</p>

		<?php
		# if all the validation and check are passed 
		} else {
            $course = processCheckbox($_POST);
            $card = $_POST['cardnum'];
            $log = $_POST['name'].";".$_POST['id'].";".$card.";";
            if($_POST['cardtype'] == 'visa')
            {
                $card .= ' (Visa)';
                $log .= 'visa';
            }
            else
            {
                $card .= ' (MasterCard)';
                $log .= 'mastercard';
            }
		?>

		<h1>Thanks, looser!</h1>
		<p>Your information has been recorded.</p>
		
		<!-- Ex 2: display submitted data -->
		<ul> 
			<li>Name: <?=$_POST['name']?></li>
			<li>ID: <?=$_POST['id']?></li>
			<!-- use the 'processCheckbox' function to display selected courses -->
			<li>Course: <?=$course?></li>
			<li>Grade: <?=$_POST['grade']?></li>
			<li>Credit Card : <?=$card?> </li>
		</ul>
		
		<!-- Ex 3 : 
			<p>Here are all the loosers who have submitted here:</p> -->
		<?php
			$filename = "loosers.txt";
			/* Ex 3: 
			 * Save the submitted data to the file 'loosers.txt' in the format of : "name;id;cardnumber;cardtype".
			 * For example, "Scott Lee;20110115238;4300523877775238;visa"
			 */
            file_put_contents($filename, $log."\r\n",FILE_APPEND);
            $list = file_get_contents ($filename);
		?>
		
		<!-- Ex 3: Show the complete contents of "loosers.txt".
			 Place the file contents into an HTML <pre> element to preserve whitespace -->
        <div>
            <p>Here are all the loosers who have sumitted here:</p>
            <pre><?=$list?></pre>
        </div>
		
		<?php
		}
		?>
		
		<?php
			/* Ex 2: 
			 * Assume that the argument to this function is array of names for the checkboxes ("cse326", "cse107", "cse603", "cin870")
			 * 
			 * The function checks whether the checkbox is selected or not and 
			 * collects all the selected checkboxes into a single string with comma seperation.
			 * For example, "cse326, cse603, cin870"
			 */
			function processCheckbox($names){
                $result = "";
                $count = 0;
                if($names['cse326'] == 'on')
                {
                    $result .= "CSE326";
                    $count += 1;
                }
				if($names['cse107'] == 'on')
                {
                    if ($count > 0)
                    {
                        $result .=', ';
                    }
                    $result .= "CSE107";
                    $count += 1;
                }
                if($names['cse603'] == 'on')
                {
                    if ($count > 0)
                    {
                        $result .=', ';
                    }
                    $result .= "CSE603";
                    $count += 1;
                }
				if($names['cse870'] == 'on')
                {
                    if ($count > 0)
                    {
                        $result .=', ';
                    }
                    $result .= "CSE870";
                    $count += 1;
                }
				return $result;
            }
		?>
		
	</body>
</html>
