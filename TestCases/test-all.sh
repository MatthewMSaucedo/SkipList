#!/bin/bash

# Sean Szumlanski
# COP 3503, Summer 2018

# =====================
# SkipList: test-all.sh
# =====================
# You can run this script at the command line like so:
#
#   bash test-all.sh
#
# For more details, see the assignment PDF.


################################################################################
# Shell check.
################################################################################

# Running this script with sh instead of bash can lead to false positives on the
# test cases. Yikes! These checks ensure the script is not being run through the
# Bourne shell (or any shell other than bash).

if [ "$BASH" != "/bin/bash" ]; then
  echo ""
  echo " Bloop! Please use bash to run this script, like so: bash test-all.sh"
  echo ""
  exit
fi

if [ -z "$BASH_VERSION" ]; then
  echo ""
  echo " Bloop! Please use bash to run this script, like so: bash test-all.sh"
  echo ""
  exit
fi


################################################################################
# Initialization.
################################################################################

PASS_CNT=0
NUM_TEST_CASES=16


################################################################################
# Check that all required files are present.
################################################################################

if [ ! -f SkipList.java ]; then
	echo ""
	echo " Error: You must place SkipList.java in this directory before we can"
	echo "        proceed. Aborting test script."
	echo ""
	exit
fi

if [ ! -f RNG.java ]; then
	echo ""
	echo " Error: You must place RNG.java in this directory before we can"
	echo "        proceed. Aborting test script."
	echo ""
	exit
fi

if [ ! -d sample_output ]; then
	echo ""
	echo " Error: You must place the sample_output folder in this directory"
	echo "        before we can proceed. Aborting test script."
	echo ""
	exit
fi

for i in `seq -f "%02g" 1 $NUM_TEST_CASES`;
do
	if [ ! -f TestCase$i.java ]; then
		echo ""
		echo " Error: You must place TestCase$i.java in this directory before we"
		echo "        can proceed. Aborting test script."
		echo ""
		exit
	fi
done

for i in `seq -f "%02g" 1 $NUM_TEST_CASES`;
do
	if [ ! -f sample_output/TestCase$i-output.txt ]; then
		echo ""
		echo " Error: You must place TestCase$i-output.txt in the sample_output directory"
		echo "        before we can proceed. Aborting test script."
		echo ""
		exit
	fi
done


################################################################################
# Compile and run test cases.
################################################################################

echo ""
echo "================================================================"
echo "Running test cases..."
echo "================================================================"
echo ""

for i in `seq -f "%02g" 1 $NUM_TEST_CASES`;
do
	echo -n "  [Test Case] Checking TestCase$i... "

	# Make sure any pre-compiled classes get re-compiled.
    rm -rf *.class

	# Attempt to compile.
	javac SkipList.java TestCase$i.java 2> /dev/null
	compile_val=$?
	if [[ $compile_val != 0 ]]; then
		echo "** fail ** (failed to compile)"
		continue
	fi

	# Run program. Capture return value to check whether it crashes.
	java TestCase$i > myoutput.txt 2> /dev/null
	execution_val=$?
	if [[ $execution_val != 0 ]]; then
		echo "** fail ** (program crashed)"
		continue
	fi

	# Run diff and capture its return value.
	diff myoutput.txt sample_output/TestCase$i-output.txt > /dev/null
	diff_val=$?
	
	# Output results based on diff's return value.
	if  [[ $diff_val != 0 ]]; then
		echo "** fail ** (output does not match)"
	else
		echo "PASS!"
		PASS_CNT=`expr $PASS_CNT + 1`
	fi
done


################################################################################
# Special check for compile-time warnings and warning suppression annotations.
################################################################################

# Increment number of test cases by 2 to account for these safety checks.
NUM_TEST_CASES=`expr $NUM_TEST_CASES + 2`

echo ""
echo "================================================================"
echo "Running additional tests and safety checks..."
echo "================================================================"
echo ""

javac SkipList.java 2> SkipList__warning.err

grep unchecked SkipList__warning.err > /dev/null 2> /dev/null
warn_val=$?

grep "@Suppress" SkipList.java > /dev/null 2> /dev/null
supp_val=$?

warn_note=0
supp_note=0

if [[ $warn_val == 0 ]]; then
	echo "  [Additional Check] Compiles without warnings: ** fail **"
	warn_note=1
else
	echo "  [Additional Check] Compiles without warnings: PASS"
	PASS_CNT=`expr $PASS_CNT + 1`
fi

if [[ $supp_val == 0 ]]; then
	echo "  [Additional Check] No suppression annotations: ** fail **"
	supp_note=1
else
	echo "  [Additional Check] No suppression annotations: PASS"
	PASS_CNT=`expr $PASS_CNT + 1`
fi


################################################################################
# Cleanup an lingering .class or output files generated by this script.
################################################################################

rm -f *.class
rm -f SkipList__warning.err
rm -f myoutput.txt


################################################################################
# Final thoughts.
################################################################################

echo ""
echo "================================================================"
echo "Final Report"
echo "================================================================"

if [ $PASS_CNT -eq $NUM_TEST_CASES ]; then
	echo ""
	echo "              ,)))))))),,,"
	echo "            ,(((((((((((((((,"
	echo "            )\\\`\\)))))))))))))),"
	echo "     *--===///\`_    \`\`\`((((((((("
	echo "           \\\\\\ b\\  \\    \`\`)))))))"
	echo "            ))\\    |     ((((((((               ,,,,"
	echo "           (   \\   |\`.    ))))))))       ____ ,)))))),"
	echo "                \\, /  )  ((((((((-.___.-\"    \`\"((((((("
	echo "                 \`\"  /    )))))))               \\\`)))))"
	echo "                    /    ((((\`\`                  \\((((("
	echo "              _____|      \`))         /          |)))))"
	echo "             /     \\                 |          / ((((("
	echo "            /  --.__)      /        _\\         /   )))))"
	echo "           /  /    /     /'\`\"~----~\`  \`.       \\   (((("
	echo "          /  /    /     /\`              \`-._    \`-. \`)))"
	echo "         /_ (    /    /\`                    \`-._   \\ (("
	echo "        /__|\`   /   /\`                        \`\\\`-. \\ ')"
	echo "               /  /\`                            \`\\ \\ \\"
	echo "              /  /                                \\ \\ \\"
	echo "             /_ (                                 /_()_("
	echo "            /__|\`                                /__/__|"
	echo ""
	echo "                             Legendary."
	echo ""
	echo "                10/10 would run this program again."
	echo ""
	echo "  CONGRATULATIONS! You appear to be passing all the test cases"
	echo "  and safety checks performed by this script!"
	echo ""
	echo "  Now, have you considered writing some additional test cases of"
	echo "  your own? Keep in mind, the test cases I wrote for you were"
	echo "  just a sort of starter pack, designed to show you how you can"
	echo "  write test cases for your program. That's something you can do"
	echo "  even before you've completed the required methods for each"
	echo "  program."
	echo ""
	echo "  You should always create additional test cases in order to"
	echo "  fully test the functionality and correctness of your code."
	echo ""
else
	echo "                           ."
	echo "                          \":\""
	echo "                        ___:____     |\"\\/\"|"
	echo "                      ,'        \`.    \\  /"
	echo "                      |  o        \\___/  |"
	echo "                    ~^~^~^~^~^~^~^~^~^~^~^~^~"
	echo ""
	echo "                           (fail whale)"

	if [[ $warn_note != 0 ]]; then
		echo ""
		echo "Note: You can type 'javac SkipList.java -Xlint:unchecked' at the"
		echo "      command line in Eustis for additional details about why your"
		echo "      code is generating warnings. Note that compiler warnings"
		echo "      might result in point deductions for this assignment."
	fi

	if [[ $supp_note != 0 ]]; then
		echo ""
		echo "Note: You seem to be using a @Suppress annotation in your code. This"
		echo "      might result in a point deduction for this assignment."
		echo ""
		echo "      This message might appear even if you have commented out a"
		echo "      suppression annotation. Please be sure to remove any comments"
		echo "      that include @Suppress annotations of any kind so that your"
		echo "      code won't automatically be flagged for using suppressions."
	fi

	echo ""
	echo "Note: The fail whale is friendly and adorable! He is not here to"
	echo "      demoralize you, but rather, to bring you comfort and joy in"
	echo "      your time of need. \"Keep plugging away,\" he says! \"You"
	echo "      can do this!\""
	echo ""
fi
