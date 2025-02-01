from sys import argv
from math import log
import unicodedata
import re

script, terminals, filename = argv

# Code to get all the unicodes in to appropiate variables
terminals = open(terminals)
terms = terminals.read()
exec terms

# Reading the input file
txt = open(filename).read()
text_raw = txt.decode('utf-8')

# Removing the irrelevant part
text = re.sub( r'\%\%\%\%\% .*\n', '', text_raw)

print "---------------------------------------------------------------"

def initialMarker():
	# Rule 1
	if (re.match('v.*', component) != None) or (re.match('cm+', component) != None):
		mark.append('F')
	elif component == 'h':
		mark.append('H')
	else:
		# Rule 2
		rule2_array = [
		u'\u0907',
		u'\u0908',
		u'\u0909',
		u'\u090A',
		u'\u090B',
		u'\u093F',
		u'\u0940',
		u'\u0941',
		u'\u0942',
		u'\u0943',
		u'\u0944'
		]
		rule3_array = [
		u'\u092F',
		u'\u0930',
		u'\u0931',
		u'\u0932',
		u'\u0933',
		u'\u0934',
		u'\u0935'
		]
		if cluster == u'\u092f' and len(clusters) > 1 and clusters[-2][-1] in rule2_array:
			mark.append('F')
		# Rule 3
		elif cluster in rule3_array and mark:
			if mark[-1] == 'H':
				mark.append('F')
			else:
				mark.append('U')
		else:
			mark.append('U')

# Appying Choudhary's algorithm and finding syllables
syllables = {}
data_array = []
# Word-wise processing of the corpus
for word in re.split('[\s \!\@\#\$\%\^\&\*\(\)\-\=\_\+\[\]\\\{\}\|\;\'\:\"\,\.\/\<\>\?\~\`]', text):
	# print ">>> " + word
	cluster = ''
	clusters = []
	component = ''
	components = []
	mark = []
	last = None
	for c in word:
		if c in punctuations:
			continue
		if (c in matras or c in halant or c in modifier):
			cluster += c
			if c in modifier:
				component += ''
			elif c in halant:
				component = component[:-1] + 'h'
			elif c in matras:
				component += 'm'
		else:
			if cluster:
				clusters.append(cluster)
				components.append(component)
				initialMarker()
			cluster = c
			if c in vowels:
				component = 'v'
			elif c in consonants:
				component = 'c'
			elif c in numbers:
				component = 'n'
		last = c
	if cluster:
		clusters.append(cluster)
		components.append(component)
		initialMarker()

	# Rule 4 and 6
	for x in xrange(0,len(mark)):
		# Rule 6
		if x == len(mark) - 1:
			if mark[x] == 'U' and components[x] == 'c':
				mark[x] = 'H'
			continue
		# Rule 4
		if mark[x] == 'U' and re.match('v.*', components[x+1]) != None:
			mark[x] = 'F'

	# Rule 5
	for x in xrange(0,len(mark)):
		if x == len(mark) - 1:
			pass
		elif mark[x] == 'U' and mark[x+1] == 'F' and (re.match('v.*', components[x+1]) != None or components[x+1] == 'c'):
			mark[x] = 'F'

	# Rule 7
	for x in xrange(0,len(mark)):
		if x == len(mark) - 1:
			pass
		elif mark[x] == 'U' and mark[x+1] == 'H' and re.match('c', components[x+1]) != None:
			mark[x] = 'F'

	# Rule 8
	for x in xrange(0,len(mark) - 1):
		if mark[x] == 'U':
			if x-1 >= 0 and mark[x-1] == 'F' and ( mark[x+1] == 'F' or mark[x+1] == 'U' ):
				mark[x] = 'H'
			else:
				mark[x] = 'F'

	# print clusters
	# print components
	# print mark

	# splitting syllables
	syll_breaks = [0] * len(mark)
	for x in xrange(0,len(mark)):
		if x > 0 and mark[x-1] == 'F' and mark[x] == 'F' and re.match('v.*', components[x]) == None :
			syll_breaks[x] = 1
		if x > 1 and mark[x-1] == 'H' and mark[x] == 'F' and syll_breaks[x-1] == 0 :
			syll_breaks[x] = 1
	first_flag = 1
	for x in xrange(len(mark)-1, 0):
		if x >= 0 and components[x-1] == 'h' and re.match('c', components[x]) != None and first_flag == 0:
			syll_breaks[x] = 1
		if x >= 0 and syll_breaks[x] == 1:
			first_flag = 0

	syllable = ''
	for x in xrange(0, len(mark)):
		if syll_breaks[x] == 0:
			syllable += clusters[x]
		else:
			# print ">>" + syllable
			if syllable != '':
				data_array.append(syllable)
			if syllable in syllables:
				syllables[syllable] += 1
			else:
				if syllable != '':
					syllables[syllable] = 1
			syllable = clusters[x]
	# print ">>" + syllable
	if syllable != '':
		data_array.append(syllable)
	if syllable in syllables:
		syllables[syllable] += 1
	else:
		if syllable != '':
			syllables[syllable] = 1

print "--------------------------------------------------------------------------------"
# print syllables

# For syllable-bigrams
bigrams = {}
for i in range(0,len(data_array)-1):
	# print data_array[i]
	bigram = data_array[i] + data_array[i+1]
	# print ">> " + bigram
	if bigram in bigrams:
		bigrams[bigram] += 1
	else:
		if bigram != None and bigram != '': 
			bigrams[bigram] = 1

outputFile = open("data_" + filename, "w")
for key in sorted(syllables, key = syllables.get, reverse = True)[:1000]:
	print >> outputFile, key.encode('utf8'), ':\t', syllables[key]

outputFile = open("bigramData_" + filename, "w")
for key in sorted(bigrams, key = bigrams.get, reverse = True)[:1000]:
	print >> outputFile, key.encode('utf8'), ':\t', bigrams[key]


# Creating the plots
# import matplotlib.pyplot as plt
import operator
from collections import OrderedDict
from itertools import count
from itertools import islice


def take(n, iterable):
    return list(islice(iterable, n))

sorted_syllables = sorted(syllables.items(), key=operator.itemgetter(1), reverse=True)[:1000]
sorted_log_syllables = [(syll,log(freq)) for syll, freq in sorted_syllables]
sorted_log_syllables = OrderedDict(sorted_log_syllables)

outputFile = open("log_data_" + filename, "w")
for key in sorted(sorted_log_syllables, key = sorted_log_syllables.get, reverse = True)[:1000]:
	print >> outputFile, key.encode('utf8'), '\t', sorted_log_syllables[key]

# plt.bar(*zip(*zip(count(), l.values())))
# plt.title("Histogram")
# plt.xticks(*zip(*zip(count(0.4), l.keys())))
# plt.xlabel("Syllable")
# plt.ylabel("log(Frequency)")

# plt.savefig('plot_sanskrit')
# plt.show()