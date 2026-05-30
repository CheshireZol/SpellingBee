const PALABRAS_POR_PAGINA = 20;

// Fallback de datos para modo local offline (CORS file:// protocol / double-click)
const RONDA1_FALLBACK = `| # | word | type | pronunciation| meaning | dificulty |
| 1 | adorable | adj. | //əˈdɔːrəbl// | very attractive and easy to feel love for| fácil |
| 2 | adult | n. | //ˈædʌlt// | a fully grown person who is legally responsible for their actions| fácil |
| 3 | afraid | adj. | //əˈfreɪd// | feeling fear; frightened because you think that you might be hurt or suffer| fácil |
| 4 | afternoon | n. | //ˌæftərˈnuːn// | the part of the day from 12 midday until about 6 o’clock| fácil |
| 5 | agree | v. | //əˈɡriː// | to have the same opinion as somebody; to say that you have the same opinion| fácil |
| 6 | alien | n. | //ˈeɪliən// | a person who is not a citizen of the country in which they live or work| medio |
| 7 | amazing | adj. | //əˈmeɪzɪŋ// | very surprising, especially in a way that makes you feel pleasure or admiration| fácil |
| 8 | ambulance | n. | //ˈæmbjələns// | a vehicle with special equipment, used for taking sick or injured people to a hospital| medio |
| 9 | anchor | n. | //ˈæŋkər// | a heavy metal object that is attached to a rope or chain and dropped over the side of a ship or boat to keep it in one place| medio |
| 10 | aquatic | adj. | //əˈkwætɪk// | growing or living in, on or near water| medio |
| 11 | Astronomy | n. | //əˈstrɑːnəmi// | the scientific study of the sun, moon, stars, planets, etc.| medio |
| 12 | Azkaban | n. | //əˈzkəban// | high security magical prison| difícil |
| 13 | barefoot | adj. | //ˈberfʊt// | not wearing anything on your feet| medio |
| 14 | baseball | n. | //ˈbeɪsbɔːl// | a game played especially in the US by two teams of nine players, using a bat and a ball| fácil |
| 15 | beautiful | adj. | //ˈbjuːtɪfl// | having beauty; pleasing to the senses or to the mind| fácil |
| 16 | because | conj. | //bɪˈkɔːz// | for the reason that| fácil |
| 17 | behind | p. | //bɪˈhaɪnd// | at or towards the back of somebody/something, and often hidden by it or them| fácil |
| 18 | believe | v. | //bɪˈliːv// | to feel certain that something is true or that somebody is telling you the truth| fácil |
| 19 | bicycle | n. | //ˈbaɪsɪkl// | a road vehicle with two wheels that you ride by| fácil |
| 20 | billboard | n. | //ˈbɪlbɔːrd// | a large board on the outside of a building or at the side of the road, used for putting advertisements on| medio |
| 21 | birthday | n. | //ˈbɜːrθdeɪ// | the day in each year which is the same date as the one on which you were born| fácil |
| 22 | blind | adj. | //blaɪnd// | not able to see| fácil |
| 23 | block | n. | //blɑːk// | a large piece of a solid material that is square or rectangular in shape and usually has flat sides| fácil |
| 24 | bloom | v. | //bluːm// | to produce flowers| medio |
| 25 | bored | adj. | //bɔːrd// | feeling tired and impatient because you have lost interest in somebody/something or because you have nothing to do| fácil |
| 26 | borrow | v. | //ˈbɔːroʊ// | to take and use something that belongs to somebody else, and return it to them at a later time| medio |
| 27 | breakfast | n. | //ˈbrekfəst// | the first meal of the day| fácil |
| 28 | bridge | n. | //brɪdʒ// | a structure that is built over a road, railway/railroad, river, etc. so that people or vehicles can cross from one side to the other| fácil |
| 29 | broccoli | n. | //ˈbrɑːkəli// | a vegetable with a thick green stem and several dark green or purple flower heads| difícil |
| 30 | bucket | n. | //ˈbʌkɪt// | an open container with a handle, used for carrying or holding liquids, sand, etc.| medio |
| 31 | butter | n. | //ˈbʌtər// | a soft yellow food made from cream, used in cooking and for spreading on bread| fácil |
| 32 | camel | n. | //ˈkæml// | an animal with a long neck and one or two humps on its back, used in desert countries for riding on or for carrying goods| fácil |
| 33 | candle | n. | //ˈkændl// | a round stick of wax with a piece of string (called a wick ) through the middle which is lit to give light as it burns| fácil |
| 34 | celebrate | v. | //ˈselɪbreɪt// | to show that a day or an event is important by doing something special on it| medio |
| 35 | charm | n. | // tʃɑːrm // | the power of pleasing or attracting people| medio |
| 36 | children | n. | //ˈtʃɪldrən// | pl. of child: a young human who is not yet an adult| fácil |
| 37 | China | n. | //ˈtʃaɪnə// | a country in eastern Asia| fácil |
| 38 | Chinese | adj. | //ˌtʃaɪˈniːz// | from or connected with China| fácil |
| 39 | choice | n. | //tʃɔɪs// | an act of choosing between two or more possibilities; something that you can choose| medio |
| 40 | Christmas | n. | //ˈkrɪsməs// | (also Christmas Day) 25 December, the day when Christians celebrate the birth of Christ| fácil |
| 41 | church | n. | //tʃɜːrtʃ// | a building where Christians go to worship| fácil |
| 42 | circle | n. | //ˈsɜːrkl// | a completely round flat shape| fácil |
| 43 | classmate | n. | //ˈklæsmeɪt// | a person who is or was in the same class as you at school or college| fácil |
| 44 | community | n. | //kəˈmjuːnəti// | all the people who live in a particular area, country, etc. when talked about as a group| medio |
| 45 | complete | adj. | //kəmˈpliːt// | used when you are emphasizing something, to mean ‘to the greatest degree possible’| medio |
| 46 | computer | n. | //kəmˈpjuːtər// | an electronic machine that can store, organize and find information, do calculations and control other machines| fácil |
| 47 | conflict | n. | //ˈkɑːnflɪkt// | a situation in which people, groups or countries are involved in a serious disagreement or argument| medio |
| 48 | contact | n. | //ˈkɑːntækt// | the act of communicating with somebody, especially regularly| fácil |
| 49 | cottage | n. | //ˈkɑːtɪdʒ// | a small house, especially in the country| medio |
| 50 | cotton | n. | //ˈkɑːtn// | a plant grown in warm countries for the soft white hairs around its seeds that are used to make cloth and thread| fácil |
| 51 | country | n. | //ˈkʌntri// | an area of land that has or used to have its own government and laws| fácil |
| 52 | coyote | n. | //kaɪˈoʊti// | an American wild animal of the dog family| medio |
| 53 | crispy | adj. | //ˈkrɪspi// | pleasantly hard and dry| medio |
| 54 | crossword | n. | //ˈkrɔːswɜːrd// | a game in which you have to fit words across and downwards into spaces with numbers in a square diagram. You find the words by solving clues| medio |
| 55 | decide | v. | //dɪˈsaɪd// | to think carefully about the different possibilities that are available and choose one of them| fácil |
| 56 | decorate | v. | //ˈdekəreɪt// | to make something look more attractive by putting things on it| medio |
| 57 | delicious | adj. | //dɪˈlɪʃəs// | having a very pleasant taste or smell| medio |
| 58 | dialog | n. | //ˈdaɪəlɔːɡ// | conversations in a book, play, or film/movie| medio |
| 59 | dinner | n. | //ˈdɪnər// | the main meal of the day, eaten either in the middle of the day or in the evening| fácil |
| 60 | dinosaur | n. | //ˈdaɪnəsɔːr// | an animal that lived millions of years ago but is now extinct| medio |
| 61 | disease | n. | //dɪˈziːz// | an illness affecting humans, animals or plants, often caused by infection| difícil |
| 62 | dolphin | n. | //ˈdɑːlfɪn// | a sea animal (a mammal ) that looks like a large fish with a pointed mouth| fácil |
| 63 | dragon | n. | //ˈdræɡən// | a large aggressive animal with wings and a long tail, that can breathe out fire| fácil |
| 64 | drink | v. | //drɪŋk// | to take liquid into your mouth and swallow it| fácil |
| 65 | drop | v. | //drɑːp// | to fall or allow something to fall by accident| fácil |
| 66 | Earth | n. | //ɜːrθ// | the world; the planet that we live on| fácil |
| 67 | Egyptian | n. | //iˈdʒɪpʃn// | ( a person) from Egypt| difícil |
| 68 | element | n. | //ˈelɪmənt// | a necessary or typical part of something| medio |
| 69 | England | n. | //ˈɪŋɡlənd// | a country forming the largest and southernmost part of Great Britain and of the United Kingdom, and containing the capital, London| fácil |
| 70 | enormous | adj. | //ɪˈnɔːrməs// | extremely large| difícil |
| 71 | entrance | n. | //ˈentrəns// | a door, gate, passage, etc. used for entering a room, building or place| medio |
| 72 | fantastic | adj. | //fænˈtæstɪk// | extremely good; excellent| fácil |
| 73 | farmer | n. | //ˈfɑːrmər// | a person who owns or manages a farm| fácil |
| 74 | father | n. | //ˈfɑːðər// | a male parent of a child or an animal| fácil |
| 75 | football | n. | //ˈfʊtbɔːl// | a game played by two teams of 11 players, using a ball which players kick up and down the playing field. Teams try to kick the ball into the other team’s goal| fácil |
| 76 | forest | n. | //ˈfɔːrɪst// | the sound or mark made each time your foot touches the ground when you are walking or running| fácil |
| 77 | Friday | n. | //ˈfraɪdeɪ// | the day of the week after Thursday and before Saturday| fácil |
| 78 | friend | n. | //frend// | a person you know well and like, and who is not usually a member of your family| fácil |
| 79 | future | n. | //ˈfjuːtʃər// | the time that will come after the present or the events that will happen then| fácil |
| 80 | game | n. | //ɡeɪm// | an activity or a sport with rules in which people or teams compete against each other| fácil |
| 81 | garage | n. | //ɡəˈrɑːʒ// | a building for keeping one or more cars or other vehicles in| fácil |
| 82 | genie | n. | //ˈdʒiːni// | a spirit with magic powers, especially one that lives in a bottle or a lamp| medio |
| 83 | ghost | n. | //ɡoʊst// | the spirit of a dead person that a living person believes they can see or hear| fácil |
| 84 | giant | n. | //ˈdʒaɪənt// | a very large strong person who is often cruel| fácil |
| 85 | giraffe | n. | //dʒəˈræf// | a tall African animal with a very long neck, long legs, and dark marks on its coat| medio |
| 86 | grandma | n. | //ˈɡrænmɑː// | grandmother| fácil |
| 87 | grandpa | n. | //ˈɡrænpɑː// | grandfather| fácil |
| 88 | Gryffindor | n. | // ˈɡrɪfɪndɔːr// | Harry´s house at Hogwarts| difícil |
| 89 | golden | adj. | //ˈɡoʊldən// | made of gold| fácil |
| 90 | half | n. | //hæf// | either of two equal parts into which something is or can be divided| fácil |
| 91 | Halloween | n. | //ˌhæloʊˈiːn// | the night of 31st October when it was believed in the past that dead people appeared from their graves, and which is now celebrated in the US, Canada and Britain by children who dress as ghosts, witches, etc.| medio |
| 92 | hamburger | n. | //ˈhæmbɜːrɡər// | finely chopped beef made into a flat round shape that is then fried, often served in a bread roll| fácil |
| 93 | help | v. | //help// | to make it easier or possible for somebody to do something by doing something for them or by giving them something that they need| fácil |
| 94 | hug | v. | //hʌɡ// | to put your arms around somebody and hold them tightly, especially to show that you like or love them| fácil |
| 95 | huge | adj. | //hjuːdʒ// | extremely large in size or amount; great in degree| fácil |
| 96 | Hufflepuff | n. | //hʌflpʌf// | a house in Howarts| difícil |
| 97 | ill | adj. | //ɪl// | suffering from an illness or disease; not feeling well| fácil |
| 98 | important | adj. | //ɪmˈpɔːrtnt// | having a great effect on people or things; of great value| fácil |
| 99 | incredible | adj. | //ɪnˈkredəbl// | impossible or very difficult to believe| medio |
| 100 | interest | n. | //ˈɪntrəst// | wanting to know more| fácil |
| 101 | inventor | n. | //ɪnˈventər// | a person who has invented something or whose job is inventing things| medio |
| 102 | Italian | n. | //ɪˈtæliən// | from Italy| medio |
| 103 | jaguar | n. | //ˈdʒæɡjuər// | a large animal of the cat family that has yellowish-brown fur with black rings and spots. Jaguars live in parts of Central and S America| medio |
| 104 | knock | v. | //nɑːk// | to hit a door, etc. firmly in order to attract attention| medio |
| 105 | koala | n. | //koʊˈɑːlə// | an Australian animal with thick grey fur, large ears and no tail. Koalas live in trees and eat leaves| fácil |
| 106 | layer | n. | //ˈler// | a quantity or thickness of something that lies over a surface or between surfaces| medio |
| 107 | learn | v. | //lɜːrn// | to gain knowledge or skill by studying, from experience, from being taught, etc.| fácil |
| 108 | letter | n. | //ˈletər// | a message that is written down or printed on paper and usually put in an envelope and sent to somebody| fácil |
| 109 | lizard | n. | //ˈlɪzərd// | a small reptile with a rough skin, four short legs and a long tail| medio |
| 110 | lollipop | n. | //ˈlɑːlipɑːp// | a hard round or flat sweet/candy made of boiled sugar on a small stick| medio |
| 111 | London | n. | //ˈlʌndən// | the capital city of England and the UK| fácil |
| 112 | machine | n. | //məˈʃiːn// | a piece of equipment with moving parts that is designed to do a particular job. The power used to work a machine may be electricity, steam, gas, etc. or human power| medio |
| 113 | magical | adj. | //ˈmædʒɪkl// | containing magic; used in magic| fácil |
| 114 | material | n. | //məˈtɪriəl// | cloth used for making clothes, curtains, etc.| medio |
| 115 | memory | n. | //ˈmeməri// | ability to remember| fácil |
| 116 | mistake | n. | //mɪˈsteɪk// | an action or an opinion that is not correct, or that produces a result that you did not want| fácil |
| 117 | month | n. | //mʌnθ// | any of the twelve periods of time into which the year is divided, for example May or June| fácil |
| 118 | mother | n. | //ˈmʌðər// | a female parent of a child or animal; a person who is acting as a mother to a child| fácil |
| 119 | muggle | n. | /məgls// | a person who does not have magical powers| medio |
| 120 | music | n. | //ˈmjuːzɪk// | sounds that are arranged in a way that is pleasant or exciting to listen to. People sing music or play it on instruments| fácil |
| 121 | mystery | n. | //ˈmɪstri// | something that is difficult to understand or to explain| medio |
| 122 | narration | n. | //nəˈreɪʃn// | the act or process of telling a story, especially in a novel, a film/movie or a play| medio |
| 123 | nobody | pron. | //ˈnoʊbədi// | no one| fácil |
| 124 | October | n. | //ɑːkˈtoʊbər// | the 10th month of the year, between September and November| fácil |
| 125 | offer | v. | //ˈɔːfər// | to say that you are willing to do something for somebody or give something to somebody| fácil |
| 126 | organize | v. | //ˈɔːrɡənaɪz// | to arrange for something to happen or to be provided| medio |
| 127 | Patronus | n. | //pəˈtrəˈnus// | Wizards defend themselves against Dementors with a Patronus charm, and Potter conjures a glowing white stag to chase them off.| difícil |
| 128 | picture | n. | //ˈpɪktʃər// | painting or drawing, etc. that shows a scene, a person or thing| fácil |
| 129 | pocket | n. | //ˈpɑːkɪt// | in clothing, a small piece of material like a small bag sewn into or onto a piece of clothing so that you can carry things in it| fácil |
| 130 | poem | n. | //ˈpoʊəm// | a piece of writing in which the words are chosen for their sound and the images they suggest, not just for their obvious meanings| fácil |
| 131 | Potter | n. | // ˈpɑːtər // | A boy wizard and the hero of a series of widely read fantasies by the British author J. K. Rowling| fácil |
| 132 | princess | n. | //ˈprɪnses// | a female member of a royal family who is not a queen, especially the daughter or granddaughter of the king or queen| fácil |
| 133 | pumpkin | n. | //ˈpʌmpkɪn// | a large round vegetable with thick orange skin| medio |
| 134 | recycle | v. | //ˌriːˈsaɪkl// | to treat things that have already been used so that they can be used again| medio |
| 135 | remember | v. | //rɪˈmembər// | somebody/something from the past| fácil |
| 136 | remove | v. | //rɪˈmuːv// | to take something/somebody away from a place| fácil |
| 137 | result | n. | //rɪˈzʌlt// | caused by something| fácil |
| 138 | ride | v. | //raɪd// | to sit on a horse, etc. and control it as it moves| fácil |
| 139 | right | adj. | //raɪt// | true or correct as a fact| fácil |
| 140 | rocket | n. | //ˈrɑːkɪt// | a spacecraft in the shape of a tube that is driven by a stream of gases let out behind it when fuel is burned inside| fácil |
| 141 | secret | n. | //ˈsiːkrət// | known about by only a few people; kept hidden from others| fácil |
| 142 | scissors | n. | //ˈsɪzərz// | a tool for cutting paper or cloth, that has two sharp blades with handles, joined together in the middle| difícil |
| 143 | signature | n. | //ˈsɪɡnətʃər// | your as you usually write it, for example at the end of a letter| difícil |
| 144 | situation | n. | //ˌsɪtʃuˈeɪʃn// | all the circumstances and things that are happening at a particular time and in a particular place| medio |
| 145 | skate | v. | //skeɪt// | to move on skates| fácil |
| 146 | Slytherin | n. | //ˈslɪˈθerɪŋ// | antagonistic house at Howarts| difícil |
| 147 | soccer | n. | //ˈsɑːkər// | a game played by two teams of 11 players, using a round ball which players kick up and down the playing field. Teams try to kick the ball into the other team’s goal| fácil |
| 148 | SortingHat | n. | // ˈsɔːrtɪŋ hæt // | talking hat which puts pupils in a house at Howarts| medio |
| 149 | station | n. | //ˈsteɪʃn// | a place where trains stop so that passengers can get on and off| fácil |
| 150 | student | n. | //ˈstuːdnt// | a person who is studying at a school| fácil |
| 151 | study | n. | //ˈstʌdi// | the activity of learning or gaining knowledge, either from books or by examining things in the world| fácil |
| 152 | subway | n. | //ˈsʌbweɪ// | an underground railway/railroad system in a city| fácil |
| 153 | suddenly | adv. | //ˈsʌdənli// | quickly and unexpectedly| medio |
| 154 | suddenly | adv. | //ˈsʌdənli// | quickly and unexpectedly| medio |
| 155 | summer | n. | //ˈsʌmər// | the warmest season of the year, coming between spring and autumn/fall| fácil |
| 156 | sword | n. | //sɔːrd// | a weapon with a long metal blade and a handle| medio |
| 157 | system | n. | //ˈsɪstəm// | an organized set of ideas or theories or a particular way of doing something| medio |
| 158 | teacher | n. | //ˈtiːtʃər// | a person whose job is teaching, especially in a school| fácil |
| 159 | team | n. | //tiːm// | a group of people who play a particular game or sport against another group of people| fácil |
| 160 | Thursday | n. | //ˈθɜːrzdeɪ// | the day of the week after Wednesday and before Friday| medio |
| 161 | tie | v. | //taɪ// | to attach or hold two or more things together using string, rope, etc| fácil |
| 162 | together | adv. | //təˈɡeðər// | with or near to somebody/something else; with each other| fácil |
| 163 | tooth | n. | //tuːθ// | any of the hard white structures in the mouth used for biting and chewing food| fácil |
| 164 | toothpaste | n. | //ˈtuːθpeɪst// | a substance that you put on a brush and use to clean your teeth| fácil |
| 165 | tower | n. | //ˈtaʊər// | a tall narrow building or part of a building, especially of a church or castle| fácil |
| 166 | trace | v. | //treɪs// | to follow the shape or outline of something| fácil |
| 167 | travel | v. | //ˈtrævl// | to go from one place to another, especially over a long distance| fácil |
| 168 | trendy | adj. | //ˈtrendi// | very fashionable| fácil |
| 169 | trip | n. | //trɪp// | a journey to a place and back again, especially a short one for pleasure or a particular purpose| fácil |
| 170 | trophy | n. | //ˈtroʊfi// | an object such as a silver cup that is given as a prize for winning a competition| medio |
| 171 | truck | n. | //trʌk// | a large vehicle for carrying heavy loads by road| fácil |
| 172 | true | adj. | //truː// | connected with facts rather than things that have been invented or guessed| fácil |
| 173 | turtle | n. | //ˈtɜːrtl// | a large reptile with a hard round shell, that lives in the sea| fácil |
| 174 | twin | n. | //twɪn// | one of two children born at the same time to the same mother| fácil |
| 175 | unfold | v. | //ʌnˈfoʊld// | to spread open or flat something that has previously been folded; to become open and flat| medio |
| 176 | universe | n. | //ˈjuːnɪvɜːrs// | the whole of space and everything in it, including the earth, the planets and the stars| medio |
| 177 | untie | v. | //ʌnˈtaɪ// | to undo a knot in something; to undo something that is tied| fácil |
| 178 | useful | adj. | //ˈjuːsfl// | that can help you to do or achieve what you want| fácil |
| 179 | vegetables | n. | //ˈvedʒtəbl// | a plant or part of a plant that is eaten as food| medio |
| 180 | video | n. | //ˈvɪdioʊ// | a system of recording moving pictures and sound, either using videotape or a digital method of storing data| fácil |
| 181 | visitor | n. | //ˈvɪzɪtər// | a person who visits a person or place| fácil |
| 182 | vocabulary | n. | //vəˈkæbjəleri// | all the words that a person knows or uses| medio |
| 183 | wait | v. | //weɪt// | to stay where you are or delay doing something until somebody/something comes or something happens| fácil |
| 184 | weekend | n. | //ˈwiːkend// | Saturday and Sunday| fácil |
| 185 | weird | adj. | //wɪrd// | very strange or unusual and difficult to explain| medio |
| 186 | welcome | intj. | //ˈwelkəm// | used as a greeting to tell somebody that you are pleased that they are there| fácil |
| 187 | wheel | n. | //wiːl// | one of the round objects under a car, bicycle, bus, etc. that turns when it turns| fácil |
| 188 | winter | n. | //ˈwɪntər// | the coldest season of the year, between autumn/fall and spring| fácil |
| 189 | witch | n. | //wɪtʃ// | a woman who is believed to have magic powers, especially to do evil things. In stories, she usually wears a black pointed hat and flies on a broomstick| fácil |
| 190 | woman | n. | //ˈwʊmən// | an adult female human| fácil |
| 191 | worried | adj. | //ˈwɜːrid// | thinking about unpleasant things that have happened or that might happen and therefore feeling unhappy and afraid| medio |
| 192 | wrap | v. | //ræp// | to cover something completely in paper or other material| medio |
| 193 | wrong | adj. | //rɔːŋ// | not right or correct| fácil |
| 194 | yard | n. | //jɑːrd// | an area outside a building, usually with a hard surface and a surrounding wall| fácil |
| 195 | yawn | v. | //jɔːn// | to open your mouth wide and breathe in deeply through it, usually because you are tired or bored| medio |
| 196 | yell | v. | //jel// | to shout loudly, for example because you are angry, excited, frightened or in pain| fácil |
| 197 | young | adj. | //jʌŋ// | having lived or existed for only a short time; not fully developed| fácil |
| 198 | zipper | n. | //ˈzɪpər// | a thing that you use to fasten clothes, bags, etc. It consists of two rows of metal or plastic teeth that you can pull together to close something or pull apart to open it| fácil |
| 199 | zombie | n. | //ˈzɑːmbi// | dead body that has been made alive again by magic| fácil |
| 200 | zoo | n. | //ˈzuː// | a place where many kinds of wild animals are kept for the public to see and where they are studied| fácil |`;
const RONDA2_FALLBACK = `| # | word | type | pronunciation| meaning | dificulty |
| 1 | agenda | n. | //əˈdʒen.də// | a list of matters to be discussed at a meeting. | fácil |
| 2 | anniversary | n. | //ˌæn.əˈvɝː.sɚ.i// | the day on which an important event happened in a previous year. | medio |
| 3 | airplane | n. | //ˈer.pleɪn// | a vehicle designed for air travel that has wings and one or more engines. | fácil |
| 4 | adventure | n. | //ədˈven.tʃɚ// | an unusual, exciting, and possibly dangerous activity, such as a trip or experience, or the excitement produced by such an activity. | medio |
| 5 | antenna | n. | //ænˈten.ə// | either of a pair of long, thin organs that are found on the heads of insects and crustaceans. | medio |
| 6 | article | n. | //ˈɑːr.tɪ̬.kəl// | a piece of writing on a particular subject in a newspaper or magazine, or on the internet. | medio |
| 7 | assistance | n. | //əˈsɪs.təns// | a person who help another person. | medio |
| 8 | avocado | n. | //ˌɑː.vəˈkɑː.doʊ// | a tropical fruit with thick, dark green or purple skin, a large, round seed, and soft, pale green flesh that can be eaten. | fácil |
| 9 | ancestor | n. | //ˈæn.ses.tɚ// | a person related to you who lived a long time ago. | difícil |
| 10 | always | adv. | //ˈɑːl.weɪz// | every time or all the time, | fácil |
| 11 | August | n. | //ˈɑː.ɡəst// | the eighth month of the year, after July and before September. | fácil |
| 12 | Azkaban | n. | //əˈzkəban// | high security magical prison | medio |
| 13 | ability | n. | //əˈbɪl.ə.ti̬// | the physical or mental power or skill needed to do something. | medio |
| 14 | answer | n. | //ˈæn.sɚ// | a reaction to a question, letter, phone call, etc. | fácil |
| 15 | admire | v. | //ədˈmaɪr// | to find someone or something attractive and pleasant to look at. | medio |
| 16 | butterfly | n. | //ˈbʌt.̬ɚ.flaɪ// | a type of insect with large, often brightly coloured wings. | fácil |
| 17 | basket | n. | //ˈbæs.kət// | a light container, often with a handle, that is made of thin strips of wood, metal, or plastic twisted together, used for carrying or storing things. | fácil |
| 18 | beautiful | adj. | //ˈbjuː.tə̬.fəl// | having an attractive quality that gives pleasure to those who experience it or think about it. | fácil |
| 19 | branch | n. | //bræntʃ// | one of the parts of a tree that grows out from the main trunk and has leaves, flowers, or fruit on it. | medio |
| 20 | balance | n. | //ˈbæl.əns// | the ability to remain standing, especially because your weight is equally distributed (= spread). | medio |
| 21 | button | n. | //ˈbʌt.ən// | a small, usually circular object used to fasten something, for example a shirt or coat. | fácil |
| 22 | bright | adj. | //braɪt// | full of light, shining. | medio |
| 23 | brain | n. | //breɪn// | the organ inside the head that controls thought, memory, feelings, and activity. | fácil |
| 24 | behavior | n. | //bɪˈheɪ.vjɚ// | the way that someone behaves. | medio |
| 25 | believe | v. | //bɪˈliːv// | to think that something is true, correct, or real. | fácil |
| 26 | bottle | n. | //ˈbɑː.t̬əl// | a container for liquids, usually made of glass or plastic, with a narrow neck. | fácil |
| 27 | bring | v. | //brɪŋ// | to take or carry someone or something to a place or a person, or in the direction of the person speaking. | fácil |
| 28 | before | p.adv.conj | //bɪˈfɔːr// | at or during a time earlier than (the thing mentioned). | fácil |
| 29 | balloon | n. | //bəˈluːn// | a small, thin rubber bag that you blow air into or fill with a light gas until it is round in shape. | fácil |
| 30 | brave | adj. | //breɪv// | showing no fear of dangerous or difficult things. | medio |
| 31 | best | adj. | //best// | of the highest quality, or being the most suitable, pleasing, or effective type of thing or person. | fácil |
| 32 | balcony | n. | //ˈbæl.kə.ni// | an area with a wall or bars around it that is joined to the outside wall of a building on an upper level. | medio |
| 33 | century | n. | //ˈsen.tʃər.i// | a period of 100 years counted from what is believed to be the year of the birth of Jesus Christ. | medio |
| 34 | command | n. | //kəˈmænd// | control over someone or something and responsibility for him, her, or it. | medio |
| 35 | condition | n. | //kənˈdɪʃ.ən// | the particular state that something or someone is in. | medio |
| 36 | conference | n. | //ˈkɑːn.fɚ.əns// | an event, sometimes lasting a few days, at which there is a group of talks on a particular subject, or a meeting. | medio |
| 37 | center | n. | //ˈsen.tɚ̬// | to put in a middle position. | fácil |
| 38 | cabbage | n. | //ˈkæb.ɪdʒ// | a large, round vegetable with large green, white, or purple leaves that can be eaten cooked or uncooked. | medio |
| 39 | champion | n. | //ˈtʃæm.pi.ən// | someone or something, especially a person or animal, that has beaten all other competitors in a competition. | medio |
| 40 | classroom | n. | //ˈklæs.ruːm// | a room in a school or college where groups of students are taught. | fácil |
| 41 | character | n. | //ˈker.ək.tɚ// | the particular combination of qualities in a person or place that makes them different from others. | medio |
| 42 | collect | n. | //kəˈlekt// | to get and keep things of one type such as stamps or coins as a hobby. | fácil |
| 43 | capture | n. | //ˈkæp.tʃɚ// | to take someone as your possession, especially by force. | medio |
| 44 | collecting | n. | //kəˈlekt// | to get and keep things of one type such as stamps or coins as a hobby. | fácil |
| 45 | connected | adj. | //kəˈnek.tɪd// | joined together. | fácil |
| 46 | community | n. | //kəˈmjuː.nə.ti̬// | the people living in one particular area or people who are considered as a unit because of their common interests, social group, or nationality. | medio |
| 47 | container | n. | //kənˈteɪ.nɚ// | a hollow object, such as a box or a bottle, that can be used for holding something, especially to carry or store it. | medio |
| 48 | crossword | n. | //ˈkrɑːs.wɝːd// | a game in which you write words that are the answers to questions in a pattern of black and white squares. | medio |
| 49 | continue | n. | //kənˈtɪn.juː// | to keep happening, existing, or doing something, or to cause something or someone to do this. | fácil |
| 50 | challenge | n. | //ˈtʃæl.ɪndʒ// | something that needs great mental or physical effort. | medio |
| 51 | consider | n. | //kənˈsɪd.ɚ// | to spend time thinking about a possibility or making a decision. | medio |
| 52 | cheerful | n. | //ˈtʃɪr.fəl// | happy and positive. | medio |
| 53 | concentrate | v. | //ˈkɑːn.sən.treɪt// | to direct your attention or your efforts towards a particular activity, subject, or problem. | medio |
| 54 | contrast | v. | //contrast// | an obvious difference between two or more things. | medio |
| 55 | delicate | v. | //ˈdel.ə.kət// | needing careful treatment, especially because easily damaged. | medio |
| 56 | discover | v. | //dɪˈskʌv.ɚ// | to find information, a place, or an object, especially for the first time. | medio |
| 57 | decoration | adj. | //ˌdek.ərˈeɪ.ʃən// | the activity of making something look more attractive by putting things on it or around it, or something that you use to do this. | fácil |
| 58 | delivery | n. | //dɪˈlɪv.ɚ.i// | the act of taking goods, letters, parcels, etc. to people's houses or places of work. | medio |
| 59 | debate | n. | //dɪˈbeɪt// | serious discussion of a subject in which many people take part. | difícil |
| 60 | distribute | n. | //dɪˈstrɪb.juːt// | to give something out to several people, or to spread or supply something. | difícil |
| 61 | describe | v. | //dɪˈskraɪb// | to say or write what someone or something is like. | medio |
| 62 | dissolve | n. | //dɪˈzɑːlv// | to be absorbed by a liquid, especially when mixed, or (of a liquid) to absorb a solid. | difícil |
| 63 | develop | v. | //dɪˈvel.əp// | to (cause something to) grow or change into a more advanced, larger, or stronger form. | medio |
| 64 | disappear | v. | //ˌdɪs.əˈpɪr// | If people or things disappear, they go somewhere where they cannot be seen or found. | medio |
| 65 | express | v. | //ɪkˈspres// | to show a feeling, opinion, or fact. | medio |
| 66 | evidence | n. | //ˈev.ə.dəns// | one or more reasons for believing that something is or is not true. | difícil |
| 67 | estimate | n. | //ˈes.tə.meɪt// | to guess or calculate the cost, size, value, etc. of something. | difícil |
| 68 | elaborate | adj. | //iˈlæb.ɚ.ət// | to add more information to or explain something that you have said. | difícil |
| 69 | enclose | n. | //ɪnˈkloʊz// | to surround something. | difícil |
| 70 | evening | n. | //ˈiːv.nɪŋ// | the part of the day between the end of the afternoon and night. | fácil |
| 71 | frighten | n. | //ˈfraɪ.tən// | to make someone feel fear. | medio |
| 72 | further | adj. | //ˈfɝː.ðɚ// | to a greater distance or degree, or at a more advanced level. | difícil |
| 73 | forget | n. | //fɚˈɡet// | to not bring something with you because you did not remember it. | fácil |
| 74 | fancy | adj. | //ˈfæn.si// | decorative or complicated. | medio |
| 75 | field | n. | //fiːld// | an area of land, used for growing crops or keeping animals, usually surrounded by a fence. | medio |
| 76 | gorgeous | adj. | //ˈɡɔːr.dʒəs// | very beautiful or pleasant. | medio |
| 77 | generous | adj. | //ˈdʒen.ər.əs// | willing to give money, help, kindness, etc. | medio |
| 78 | guarantee | n. | //ˌɡer.ənˈtiː// | a promise that something will be done or will happen. | difícil |
| 79 | government | n. | //ˈɡʌv.ɚn.mən// | the group of people who officially control a country. | medio |
| 80 | ground | n. | //ɡraʊnd// | the surface of Earth that you walk on. | fácil |
| 81 | Gryffindor | n. | //ˈɡrɪfɪndɔːr// | Harry´s house at Hogwarts | medio |
| 82 | gentleman | n. | //ˈdʒen.tə̬ l.mən// | a man who is polite and behaves well towards other people. | medio |
| 83 | great | adj. | //ɡreɪt// | large in amount, size, or degree. | fácil |
| 84 | guess | n. | //ɡes// | to give an answer to a particular question when you do not have all the facts and so cannot be certain if you are correct. | fácil |
| 85 | give | n. | //ɡɪv// | to offer something to someone, or to provide someone with something. | fácil |
| 86 | grateful | n. | //ˈɡreɪt.fəl// | showing or expressing thanks, especially to another person. | medio |
| 87 | gardener | n. | //ˈɡɑːr.dən.ɚ// | someone who works in a garden, growing and taking care of plants. | fácil |
| 88 | heaven | n. | //ˈhev.ən// | in many religions, the place where God is. | medio |
| 89 | harvest | adj. | //ˈhɑːr.vəst// | to pick and collect crops, or to collect plants, animals, or fish to eat. | medio |
| 90 | homeless | n. | //ˈhoʊm.ləs// | without a home. | medio |
| 91 | Halloween | n. | //// | the night of 31st October when it was believed in the past that dead people appeared from their graves, and which is now celebrated in the USA | fácil |
| 92 | handle | n. | //ˈhæn.dəl// | a part of an object designed for holding, moving, or carrying the object easily. | medio |
| 93 | human | adj. | //ˈhjuː.mən// | being, relating to, or belonging to a person or to people as opposed to animals. | fácil |
| 94 | harmony | v. | //ˈhɑːr.mə.n// | a pleasant musical sound made by different notes being played or sung at the same time. | medio |
| 95 | hologram | n. | //ˈhɑː.lə.ɡræm// | a special type of photograph or image made with a laser in which the objects shown look solid, as if they are real, rather than flat. | difícil |
| 96 | Hufflepuff | n. | //hʌflpʌf// | a house in Howarts | medio |
| 97 | honesty | n. | //ˈɑː.nə.sti// | the quality of being honest. | medio |
| 98 | honor | n.v. | //ˈɑː.nɚ// | moral behavior or integrity. | medio |
| 99 | history | n. | //ˈhɪs.tɚ̬.i// | past events considered together, especially events of a particular period, country, or subject. | fácil |
| 100 | heaven | n. | //ˈhev.ən// | in some religions, the place, sometimes imagined to be in the sky. | medio |
| 101 | industry | n. | //ˈɪn.də.stri// | he companies and activities involved in the process of producing goods for sale, especially in a factory or special area. | medio |
| 102 | impressive | n. | //ɪmˈpres.ɪv// | usually because it is special, important. | medio |
| 103 | imagination | n. | //ɪˌmædʒ.əˈneɪ.ʃən// | the ability to form pictures in the mind. | medio |
| 104 | interesting | adj. | //ˈɪn.trɪ.stɪŋ// | Someone or something that is interesting keeps your attention because he, she, or it is unusual, exciting, or has a lot of ideas. | fácil |
| 105 | independence | n. | //ˌɪn.dɪˈpen.dəns// | freedom from being governed or ruled by another country. | medio |
| 106 | ingredient | n. | //ɪnˈɡriː.di.ənt// | a food that is used with other foods in the preparation of a particular dish. | medio |
| 107 | inside | v. | //ɪnˈsaɪd// | a person's or animal's internal organs, especially the stomach or bowels. | fácil |
| 108 | January | n. | //ˈdʒæn.ju.er.i// | the first month of the year, after December and before February. | fácil |
| 109 | junior | n. | //ˈdʒuː.njɚ// | a student at a junior school. | fácil |
| 110 | jigsaw | n. | //ˈdʒɪɡ.sɑː// | a puzzle that makes a picture. | medio |
| 111 | journal | n. | //ˈdʒɝː.nəl// | a regularly published magazine or newspaper on a particular subject. | medio |
| 112 | jealous | n. | //ˈdʒel.əs// | upset and angry because someone that you love seems interested in another person. | medio |
| 113 | justice | adj. | //ˈdʒʌs.tɪs// | fairness in the way people are dealt with. | medio |
| 114 | kingdom | n. | //ˈkɪŋ.dəm// | a country ruled by a king or queen. | medio |
| 115 | kangaroo | n. | //ˌkæŋ.ɡəˈruː// | a large Australian mammal with a long stiff tail, short front legs and long powerful back legs on which it moves by jumping. | fácil |
| 116 | knight | n. | //naɪt// | a man given a rank of honour by a British king or queen because of his special achievements. | medio |
| 117 | laboratory | n. | //ˈlæb.rə.tɔːr.i// | a room or building with scientific equipment for doing scientific tests or for teaching science, or a place where chemicals or medicines are produced. | medio |
| 118 | lettuce | n. | //ˈlet.̬ɪs// | a plant with large, green leaves, eaten uncooked in salads. | medio |
| 119 | language | n. | //ˈlæŋ.ɡwɪdʒ// | a system of communication consisting of sounds, words, and grammar. | fácil |
| 120 | lawyer | n. | //ˈlɑː.jɚ// | someone whose job is to give advice to people about the law and speak for them in court. | medio |
| 121 | mystery | n. | //ˈmɪstri// | something that is difficult to understand or to explain | medio |
| 122 | muggle | n. | //məgls// | a person who does not have magical powers | medio |
| 123 | magician | n. | //ˈmɪs.tɚ.i// | something strange or not known that has not yet been explained or understood. | medio |
| 124 | marathon | n. | //ˈmer.ə.θɑːn// | a running race of slightly over 26 miles. | fácil |
| 125 | message | n. | //ˈmes.ɪdʒ// | a short piece of information that you give to a person when you cannot speak to them directly. | fácil |
| 126 | network | v. | //ˈnet.wɝːk// | a large system consisting of many similar parts that are connected together to allow movement or communication between or along the parts. | medio |
| 127 | nervous | n. | //ˈnɝː.vəs// | worried and anxious. | medio |
| 128 | notice | n. | //ˈnoʊ.tɪ̬s// | to see or become conscious of something or someone. | medio |
| 129 | ordinary | adj. | //ˈɔːr.dən.er.i// | not different or special or unexpected in any way; usual. | medio |
| 130 | outside | Adj,adv,prep. | //ˈaʊt.saɪd// | not inside a building. | fácil |
| 131 | object | n. | //ˈɑːb.dʒɪkt// | a thing that you can see or touch but that is not usually a living animal, plant, or person. | fácil |
| 132 | Patronus | n. | //ˈpeɪ.trənuː's// | enchantment | medio |
| 133 | Potter | n. | //ˈpɑːtər// | A boy wizard and the hero of a series of widely read fantasies by the British author J. K. Rowling | fácil |
| 134 | product | v. | //ˈprɑː.dʌkt// | the result you get when two or more numbers are multiplied together. | fácil |
| 135 | promise | v. | //ˈprɑː.mɪs// | to tell someone that you will certainly do something. | fácil |
| 136 | potential | v. | //poʊˈten.ʃəl// | possible when the necessary conditions exist. | medio |
| 137 | proactive | adj. | //ˌproʊˈæk.tɪv// | taking action by causing change and not only reacting to change when it happens. | difícil |
| 138 | question | v. | //ˈkwes.tʃən// | a sentence or phrase used to find out information. | fácil |
| 139 | quality | n. | //ˈkwɑː.lə.ti̬// | how good or bad something is. | medio |
| 140 | queen | n. | //kwiːn// | a woman who rules a country because she has been born into a royal family, or a woman who is married to a king. | fácil |
| 141 | respect | n. | //rɪˈspekt// | admiration felt or shown for someone or something that you believe has good ideas or qualities. | medio |
| 142 | return | n. | //rɪˈtɝːn// | to come or go back to a previous place. | fácil |
| 143 | realize | v. | //ˈriː.ə.laɪz// | to understand a situation, sometimes suddenly. | medio |
| 144 | river | n. | //ˈrɪv.ɚ// | a natural wide flow of fresh water across the land into the sea, a lake, or another river. | fácil |
| 145 | relax | v. | //rɪˈlæks// | to (cause someone to) become less active and more calm and happy. | fácil |
| 146 | retro | n. | //ˈret.roʊ// | similar to styles, fashions, etc. from the past. | medio |
| 147 | Slytherin | n. | //ˈslɪˈθerɪŋ// | antagonistic house at Howarts | medio |
| 148 | Sorting Hat | n. | //ˈsɔːrtɪŋ hæt// | talking hat which puts pupils in a house at Howarts | medio |
| 149 | strong | adj. | //strɑːŋ// | powerful; having or using great force or control. | fácil |
| 150 | special | adj. | //ˈspeʃ.əl// | not ordinary or usual. | fácil |
| 151 | success | n. | //səkˈses// | the achieving of the results wanted or hoped for. | medio |
| 152 | system | n. | //ˈsɪs.təm// | a set of connected things or devices that operate together | medio |
| 153 | September | adv. | //sepˈtem.bɚ// | the ninth month of the year, after August and before October. | fácil |
| 154 | shopping | adv. | //ˈʃɑː.pɪŋ// | the activity of buying things from shops. | fácil |
| 155 | specially | adv. | //ˈspeʃ.əl.i// | for a particular purpose. | medio |
| 156 | service | n. | //ˈsɝː.vɪs// | an amount of money charged for serving a customer in a restaurant, often paid directly to the waiter. | medio |
| 157 | scramble | n. | //ˈskræm.bəl// | to move or climb quickly but with difficulty, often using your hands to help you. | difícil |
| 158 | Saturday | n. | //ˈsæt.̬ɚ.deɪ// | the day of the week after Friday and before Sunday. | fácil |
| 159 | skeleton | n. | //ˈskel.ə.tə̬n// | the frame of bones supporting a human or animal body. | medio |
| 160 | treasure | n. | //ˈtreʒ.ɚ// | very valuable things, usually in the form of a store of precious metals, precious stones, or money. | medio |
| 161 | teach | v. | //tiːtʃ// | to give someone knowledge or to train someone; to instruct. | fácil |
| 162 | travel | v. | //ˈtræv.əl// | to make a journey, usually over a long distance. | fácil |
| 163 | teenager | n. | //ˈtiːnˌeɪ.dʒɚ// | a young person between 13 and 19 years old | fácil |
| 164 | telescope | n. | //ˈtel.ə.skoʊp// | a cylinder-shaped device for making objects that are far away look closer and larger, using a combination of lenses, or lenses and curved mirrors. | medio |
| 165 | tadpole | n. | //ˈtæd.poʊl// | a small, black creature with a large head and long tail that lives in water and develops into a frog or toad. | difícil |
| 166 | thankful | adj. | //ˈθæŋk.fə// | happy or grateful because of something. | medio |
| 167 | toothbrush | n. | //ˈtuːθ.brʌ// | a small brush with a long handle that you use to clean your teeth. | fácil |
| 168 | timetable | n. | //ˈtaɪmˌteɪ.bəl// | a detailed plan showing when events or activities will happen. | medio |
| 169 | talent | n. | //ˈtæl.ənt// | a natural ability to be good at something, especially without being taught. | fácil |
| 170 | trophy | n. | //ˈtroʊfi// | an object such as a silver cup that is given as a prize for winning a competition | medio |
| 171 | tolerance | n. | //ˈtɑː.lɚ.əns// | to accept behaviour and beliefs that are different from your own. | medio |
| 172 | transparent | adj. | //trænˈsper.ənt// | If a substance or object is transparent, you can see through it very clearly. | medio |
| 173 | terrific | adj. | //təˈrɪf.ɪk// | very good. | medio |
| 174 | tongue | n. | //tʌŋ// | the large, soft piece of flesh in the mouth that you can move, and is used for tasting, speaking, etc. | medio |
| 175 | uncle | v. | //ˈʌŋ.kə// | the brother of someone's mother or father, or the husband of someone's aunt or uncle. | fácil |
| 176 | uniform | n. | //ˈjuː.nə.fɔːrm// | a particular set of clothes that has to be worn by the members of the same organization or group of people. | fácil |
| 177 | unique | v. | //juːˈniːk// | being the only existing one of its type or, more generally, unusual, or special in some way. | medio |
| 178 | useful | adj. | //ˈjuːs.fəl// | effective; helping you to do or achieve something. | fácil |
| 179 | visit | n. | //ˈvɪz.ɪt// | to go to a place in order to look at it, or to a person in order to spend time with them. | fácil |
| 180 | voice | n. | //vɔɪ// | the sounds that are made when people speak or sing. | fácil |
| 181 | value | n. | //ˈvæl.ju// | the amount of money that can be received for something. | medio |
| 182 | vocalize | n. | //ˈvoʊ.kə.laɪz// | to express feelings or ideas in words. | difícil |
| 183 | visible | v. | //ˈvɪz.ə.bəl// | able to be seen. | medio |
| 184 | victory | n. | //ˈvɪk.tɚ.i// | an occasion when you win a game, competition, election, war, etc. or the fact that you have won. | medio |
| 185 | watch | v. | //wɑːt// | to look at something for a period of time, especially something that is changing or moving. | fácil |
| 186 | window | n. | //ˈwɪn.doʊ// | a space usually filled with glass in the wall of a building or in a vehicle, to allow light and air in and to allow people inside the building to see out. | fácil |
| 187 | wildlife | n. | //ˈwaɪld.laɪf// | animals and plants that grow independently of people, usually in natural conditions. | medio |
| 188 | worldwide | Adj,adv. | //ˈwɝːld.waɪd// | existing or happening in all parts of the world | medio |
| 189 | wonderful | n. | //ˈwʌn.dɚ.fəl// | extremely good | fácil |
| 190 | wallet | n. | //ˈwɑː.lɪ// | a small folding case for carrying paper money, credit cards and other flat objects, that can be carried in a pocket and is used especially by men. | medio |
| 191 | write | n. | //raɪt// | to make marks that represent letters, words, or numbers on a surface, such as paper or a computer screen. | fácil |
| 192 | wicked | adj. | //ˈwɪk.ɪd// | morally wrong and bad. | medio |
| 193 | want | n. | //wɑːn// | to wish for a particular thing or plan of action. "Want" is not used in polite requests. | fácil |
| 194 | wave | n. | //weɪv// | to raise your hand and move it from side to side as a way of greeting someone. | fácil |
| 195 | where | . adv conj | //wer// | to, at, or in what place. | fácil |
| 196 | white | v. | //waɪt// | of a colour like that of snow, milk, or bone. | fácil |
| 197 | west | n. | //west// | the direction in which the sun goes down in the evening, opposite to the east, or the part of an area or country that is in this direction. | fácil |
| 198 | yard | n. | //jɑːrd// | a unit of measurement equal to three feet or approximately 91.4 centimetres. | medio |
| 199 | yourself | pronoun. | //jʊrˈself// | used when the subject of the verb is "you" or the person being spoken to. | fácil |
| 200 | zebra | n. | //ˈziː.brə// | an African wild animal that looks like a horse, with black or brown and white lines on its body. | fácil |`;

// ==========================================
// 🎵 1. MOTOR DE AUDIO Y EFECTOS SINTETIZADOS (Web Audio API)
// ==========================================
const MagicAudio = {
    ctx: null,
    enabled: true,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    playSuccess() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Arpegio brillante celestial ascendente (C5 -> E5 -> G5 -> C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + index * 0.08);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + index * 0.08 + 0.15);
                
                gain.gain.setValueAtTime(0, now + index * 0.08);
                gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + index * 0.08);
                osc.stop(now + index * 0.08 + 0.35);
            });
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },
    
    playError() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Sonido descendente grave de hechizo fallido (fizzle)
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(130.81, now);
            osc.frequency.linearRampToValueAtTime(80.00, now + 0.4);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            
            // Filtro pasa bajos para atenuar sierra y hacerlo sonar a "humo mágico"
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, now);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.42);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },
    
    playClick() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Cristalino tic de varita
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2200, now);
            osc.frequency.exponentialRampToValueAtTime(1500, now + 0.06);
            
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },

    playSpellCast() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Ráfaga mágica swoosh
            const osc = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(250, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
            
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(120, now);
            osc2.frequency.exponentialRampToValueAtTime(500, now + 0.3);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.1, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            
            osc.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc2.start(now);
            osc.stop(now + 0.31);
            osc2.stop(now + 0.31);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    }
};

// ==========================================
// 🎙️ 2. SÍNTESIS DE VOZ MÁGICA (Text-to-Speech)
// ==========================================
const WizardTTS = {
    enabled: true,
    speed: 1.0,
    voice: null,

    init() {
        if (!('speechSynthesis' in window)) {
            console.warn('TTS no soportado en este navegador.');
            this.enabled = false;
            return;
        }
        this.loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    },

    loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        // Buscamos acento Británico de Inglaterra (en-GB) para inmersión Harry Potter!
        this.voice = voices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en-GB')) ||
                     voices.find(v => v.lang.startsWith('en-US')) ||
                     voices.find(v => v.lang.startsWith('en')) ||
                     voices[0];
    },

    speak(word) {
        if (!this.enabled || !word) return;
        
        window.speechSynthesis.cancel(); // Cancelar cualquier pronunciación previa
        
        const cleanWord = word.replace(/[^a-zA-Z\s-]/g, '').trim(); // Limpiar caracteres especiales de sonido
        const utterance = new SpeechSynthesisUtterance(cleanWord);
        if (this.voice) {
            utterance.voice = this.voice;
        }
        utterance.lang = this.voice ? this.voice.lang : 'en-US';
        utterance.rate = this.speed;
        utterance.pitch = 1.05; // Tono mágico sutilmente alto
        
        window.speechSynthesis.speak(utterance);
    }
};

// ==========================================
// 🧙‍♂️ 3. CONSTANTES Y VARIABLES DE ESTADO
// ==========================================
const HOUSE_CRESTS = {
    hogwarts: 'multimedia/Hogwarts_logo.png',
    gryffindor: 'multimedia/Gryffindor_logo.png',
    slytherin: 'multimedia/Slytherin_logo.png',
    ravenclaw: 'multimedia/Ravenclaw_logo.png',
    hufflepuff: 'multimedia/Hufflepuff_logo.png'
};

const HOUSE_NAMES_ES = {
    hogwarts: 'Hogwarts (General)',
    gryffindor: 'Gryffindor',
    slytherin: 'Slytherin',
    ravenclaw: 'Ravenclaw',
    hufflepuff: 'Hufflepuff'
};

let palabrasTodas = [];
let palabrasJuego = [];
let correctas = [];
let incorrectas = [];
let indice = 0;
let listaCargadaNum = '1';

// Estado de Juego Avanzado (Mágico)
let selectedHouse = 'hogwarts';
let gameMode = 'writing'; // 'writing' o 'examiner'
let housePoints = 0;
let streak = 0;
let maxStreak = 0;

// Filtros de Selección de Práctica (Por Dificultad o Capítulos)
let activeFilterType = 'pages'; // 'pages' o 'difficulty'
let selectedDifficulties = []; // Array de dificultades seleccionadas (ej: ['fácil', 'medio'])

// Elementos del DOM (Pantallas principales)
const viewConfig = document.getElementById('view-config');
const viewJuego = document.getElementById('view-juego');
const viewResultados = document.getElementById('view-resultados');

// Controles y Configuración
const radiosLista = document.querySelectorAll('input[name="lista"]');
const btnEdicion1 = document.getElementById('btn-edicion-1');
const btnEdicion2 = document.getElementById('btn-edicion-2');
const btnModeWriting = document.getElementById('btn-mode-writing');
const btnModeExaminer = document.getElementById('btn-mode-examiner');
const chkSoundFx = document.getElementById('chk-sound-fx');
const paginasContainer = document.getElementById('paginas-container');
const conteoPalabras = document.getElementById('conteo-palabras');
const btnIniciar = document.getElementById('btn-iniciar');
const headerHouseCrest = document.getElementById('header-house-crest');

// Elementos de la Arena de Juego
const lblInfoLista = document.getElementById('lbl-info-lista');
const lblProgreso = document.getElementById('lbl-progreso');
const progressBar = document.getElementById('progress-bar');
const gameCard = document.getElementById('game-card');
const bgCrestWatermark = document.getElementById('bg-crest-watermark');
const lblPalabra = document.getElementById('lbl-palabra');
const wordContainerBox = document.getElementById('word-container-box');
const lblDificultadBadge = document.getElementById('lbl-dificultad-badge');
const lblPhonetics = document.getElementById('lbl-phonetics');
const lblDesc = document.getElementById('lbl-desc');
const btnRevealWord = document.getElementById('btn-reveal-word');
const btnPronounceActive = document.getElementById('btn-pronounce-active');
const juegoHouseBadge = document.getElementById('juego-house-badge');
const lblHousePointsTracker = document.getElementById('lbl-house-points-tracker');
const wordHiddenDisplay = document.getElementById('word-hidden-display');

// Paneles de Control de Modos
const controlsExaminer = document.getElementById('controls-examiner');
const controlsWriting = document.getElementById('controls-writing');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');
const btnFinalizar = document.getElementById('btn-finalizar');
const txtSpellInput = document.getElementById('txt-spell-input');
const frmSpell = document.getElementById('frm-spell');
const spellFeedback = document.getElementById('spell-feedback');

// Resultados de la Copa de las Casas
const resultsCrest = document.getElementById('results-crest');
const lblRangoMago = document.getElementById('lbl-rango-mago');
const lblPorcentaje = document.getElementById('lbl-porcentaje');
const lblDetalleScore = document.getElementById('lbl-detalle-score');
const lblHousePointsWon = document.getElementById('lbl-house-points-won');
const refuerzoContainer = document.getElementById('refuerzo-container');
const tablaRefuerzo = document.getElementById('tabla-refuerzo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Biblioteca Modal (Grimorio Explorer)
const modalBiblioteca = document.getElementById('modal-biblioteca');
const btnBibliotecaAbrir = document.getElementById('btn-biblioteca-abrir');
const btnBibliotecaCerrar = document.getElementById('btn-biblioteca-cerrar');
const btnLibEd1 = document.getElementById('btn-lib-ed-1');
const btnLibEd2 = document.getElementById('btn-lib-ed-2');
const txtLibSearch = document.getElementById('txt-lib-search');
const libWordList = document.getElementById('lib-word-list');
let libActiveListNum = '1';
let libPalabrasCached = [];

// ==========================================
// 🎬 4. INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Motores de Audio y Voz
    MagicAudio.init();
    WizardTTS.init();
    
    // Cargar Preferencias del Almacenamiento Local (Persistencia)
    cargarPreferencias();
    
    // Asignar Eventos a los Controles
    btnEdicion1.addEventListener('click', () => cambiarEdicionRadio('1'));
    btnEdicion2.addEventListener('click', () => cambiarEdicionRadio('2'));
    btnModeWriting.addEventListener('click', () => cambiarModoJuego('writing'));
    btnModeExaminer.addEventListener('click', () => cambiarModoJuego('examiner'));
    
    chkSoundFx.addEventListener('change', (e) => {
        MagicAudio.enabled = e.target.checked;
        guardarPreferencias();
    });
    
    radiosLista.forEach(radio => radio.addEventListener('change', cargarListaActual));
    btnIniciar.addEventListener('click', iniciarJuego);
    
    // Controles de Juego Manual
    btnCorrecto.addEventListener('click', marcarCorrecto);
    btnIncorrecto.addEventListener('click', marcarIncorrecto);
    btnFinalizar.addEventListener('click', mostrarResultados);
    btnReiniciar.addEventListener('click', reiniciar);
    
    // Botones Adicionales del Juego Activo
    btnRevealWord.addEventListener('click', revelarPalabraManual);
    btnPronounceActive.addEventListener('click', () => {
        if (indice < palabrasJuego.length) {
            WizardTTS.speak(palabrasJuego[indice].palabra);
            MagicAudio.playClick();
        }
    });

    // Cambios de Velocidad del TTS
    document.querySelectorAll('input[name="tts-speed"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            WizardTTS.speed = parseFloat(e.target.value);
        });
    });

    // Formulario de Escritura Mágica
    frmSpell.addEventListener('submit', (e) => {
        e.preventDefault();
        evaluarEscrituraMagica();
    });

    // Botón de Conteo / Alternancia Total
    document.getElementById('btn-toggle-all').addEventListener('click', () => {
        MagicAudio.playClick();
        toggleAll();
    });

    // Eventos Biblioteca (Grimorio Explorer)
    btnBibliotecaAbrir.addEventListener('click', abrirBiblioteca);
    btnBibliotecaCerrar.addEventListener('click', cerrarBiblioteca);
    btnLibEd1.addEventListener('click', () => cambiarLibEdicion('1'));
    btnLibEd2.addEventListener('click', () => cambiarLibEdicion('2'));
    txtLibSearch.addEventListener('input', renderizarBibliotecaPalabras);

    // Cargar Estrellas Animadas en Fondo
    inicializarEstrellas();

    // Eventos de Filtro (Páginas vs Dificultad)
    document.getElementById('btn-filter-type-pages').addEventListener('click', () => {
        setFilterType('pages');
    });
    document.getElementById('btn-filter-type-difficulty').addEventListener('click', () => {
        setFilterType('difficulty');
    });

    // Cargar la Lista inicial por defecto
    cargarListaActual();
});

// Generar partículas de estrellas flotantes de manera procedural en el fondo
function inicializarEstrellas() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    container.innerHTML = '';
    
    const count = 45;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Atributos aleatorios
        const size = Math.random() * 2.5 + 0.5;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 15 + 10;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        // Tonos mágicos tenues amarillos/blancos/celestes
        const hues = [60, 200, 0]; // Amarillo, celeste, blanco
        const hue = hues[Math.floor(Math.random() * hues.length)];
        if (hue !== 0) {
            star.style.backgroundColor = `hsla(${hue}, 100%, 90%, ${Math.random() * 0.4 + 0.2})`;
            star.style.boxShadow = `0 0 5px hsla(${hue}, 100%, 80%, 0.5)`;
        } else {
            star.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
        }

        container.appendChild(star);
    }
}

// ==========================================
// 🛡️ 5. PERSISTENCIA Y PREFERENCIAS
// ==========================================
function guardarPreferencias() {
    const prefs = {
        selectedHouse,
        gameMode,
        soundFxEnabled: MagicAudio.enabled,
        listaSeleccionada: document.querySelector('input[name="lista"]:checked')?.value || '1',
        housePoints
    };
    localStorage.setItem('spelling_bee_wizard_prefs', JSON.stringify(prefs));
}

function cargarPreferencias() {
    try {
        const stored = localStorage.getItem('spelling_bee_wizard_prefs');
        if (stored) {
            const prefs = JSON.parse(stored);
            
            // Casa
            if (prefs.selectedHouse) {
                selectHouse(prefs.selectedHouse, false);
            }
            
            // Modo de Juego
            if (prefs.gameMode) {
                cambiarModoJuego(prefs.gameMode, false);
            }
            
            // Sonidos
            if (prefs.soundFxEnabled !== undefined) {
                MagicAudio.enabled = prefs.soundFxEnabled;
                chkSoundFx.checked = MagicAudio.enabled;
            }
            
            // Puntos acumulados de Casa
            if (prefs.housePoints !== undefined) {
                housePoints = parseInt(prefs.housePoints) || 0;
            }
            
            // Lista Edición
            if (prefs.listaSeleccionada) {
                const targetRadio = document.querySelector(`input[name="lista"][value="${prefs.listaSeleccionada}"]`);
                if (targetRadio) {
                    targetRadio.checked = true;
                    cambiarEdicionRadioVisual(prefs.listaSeleccionada);
                }
            }
        }
    } catch (e) {
        console.warn('Error cargando preferencias de localStorage:', e);
    }
}

// ==========================================
// 🎨 6. SELECCIÓN DE CASA Y TEMATIZACIÓN
// ==========================================
window.selectHouse = function(houseName, playSound = true) {
    if (playSound) MagicAudio.playSpellCast();

    // Eliminar clases anteriores de casa en el body
    document.body.classList.remove('theme-gryffindor', 'theme-slytherin', 'theme-ravenclaw', 'theme-hufflepuff');
    
    if (houseName !== 'hogwarts') {
        document.body.classList.add(`theme-${houseName}`);
    }

    selectedHouse = houseName;

    // Actualizar badges visuales de selección de casa
    document.querySelectorAll('.house-card').forEach(card => {
        card.classList.remove('border-yellow-500/40', 'bg-slate-900/60');
        card.classList.add('border-slate-800', 'bg-slate-950/40');
        card.querySelector('span:last-child').className = "font-magic text-xs sm:text-sm font-semibold text-slate-300";
    });

    const activeCard = document.getElementById(`card-house-${houseName}`);
    if (activeCard) {
        activeCard.classList.remove('border-slate-800', 'bg-slate-950/40');
        activeCard.classList.add('border-yellow-500/40', 'bg-slate-900/60');
        activeCard.querySelector('span:last-child').className = "font-magic text-xs sm:text-sm font-semibold text-yellow-500";
    }

    // Cambiar ícono del escudo en el cabezal principal
    headerHouseCrest.src = HOUSE_CRESTS[houseName];

    // Sincronizar en el juego activo si está cargado
    if (juegoHouseBadge) juegoHouseBadge.src = HOUSE_CRESTS[houseName];
    if (bgCrestWatermark) bgCrestWatermark.src = HOUSE_CRESTS[houseName];
    
    actualizarMarcadorPuntos();
    guardarPreferencias();
};

// SIMULADOR DEL SOMBRERO SELECCIONADOR
document.getElementById('btn-sorting-hat').addEventListener('click', () => {
    MagicAudio.playSpellCast();
    
    // Inyectar clase de animación flotante pesada al escudo
    headerHouseCrest.classList.add('hat-animating');
    
    // Crear una superposición modal mágica momentánea del sombrero
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md transition-all duration-300';
    overlay.innerHTML = `
        <div class="max-w-md space-y-6 flex flex-col items-center">
            <img src="multimedia/Sorting hat_logo.png" class="w-24 h-24 object-contain animate-bounce" alt="Sombrero Seleccionador">
            <h2 class="font-magic text-2xl sm:text-3xl font-black text-yellow-500 animate-pulse text-center">¡El Sombrero Seleccionador piensa!</h2>
            <div class="border border-yellow-500/30 p-6 rounded-2xl bg-slate-950/80 font-mono text-sm leading-relaxed text-slate-300" id="hat-thinking-text">
                "Veo coraje... una mente brillante también... oh, y una tremenda sed por demostrar tu deletreo..."
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const houseList = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
    const thinkingQuotes = [
        "\"¡Difícil elección! Hay una gran lealtad aquí... y un espíritu inquebrantable...\"",
        "\"¡Ah! Ingenio, veo astucia y un deseo ardiente por deletrear las palabras de poder...\"",
        "\"¡Una inteligencia filosa! Curioso de los libros y sabio de las fonéticas...\"",
        "\"¡Vaya, vaya! No teme al trabajo duro, paciente, honesto... ¿dónde te pondré?\""
    ];

    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (step < 3) {
            document.getElementById('hat-thinking-text').innerText = thinkingQuotes[Math.floor(Math.random() * thinkingQuotes.length)];
            MagicAudio.playClick();
        } else {
            clearInterval(interval);
            
            // Decisión final del sombrero
            const chosenHouse = houseList[Math.floor(Math.random() * houseList.length)];
            const crest = HOUSE_CRESTS[chosenHouse];
            const name = HOUSE_NAMES_ES[chosenHouse].toUpperCase();
            
            overlay.innerHTML = `
                <div class="max-w-md space-y-6 animate-scale flex flex-col items-center">
                    <img src="${crest}" class="w-32 h-32 object-contain float-effect filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt="${name}">
                    <h2 class="font-magic text-3xl sm:text-4xl font-black text-yellow-400 tracking-wider">¡${name}!</h2>
                    <p class="text-slate-300 font-light px-4 leading-relaxed">
                        ¡El Sombrero Seleccionador te ha asignado formalmente a la noble casa de <b>${HOUSE_NAMES_ES[chosenHouse]}</b> por tus excepcionales dotes de deletreo!
                    </p>
                    <button id="btn-accept-sorting" class="btn-magic px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-slate-950 mt-2">
                        Entrar a la Sala Común
                    </button>
                </div>
            `;
            
            MagicAudio.playSuccess();
            selectHouse(chosenHouse, false);
            
            document.getElementById('btn-accept-sorting').addEventListener('click', () => {
                headerHouseCrest.classList.remove('hat-animating');
                overlay.remove();
                MagicAudio.playSpellCast();
            });
        }
    }, 1200);
});

// ==========================================
// 📑 7. SELECCIÓN DE NIVEL Y MODOS (COMPATIBLE)
// ==========================================
function cambiarEdicionRadio(val) {
    MagicAudio.playClick();
    const rInput = document.getElementById(`radio-lista-${val}`);
    if (rInput) {
        rInput.checked = true;
        rInput.dispatchEvent(new Event('change'));
    }
    cambiarEdicionRadioVisual(val);
    guardarPreferencias();
}

function cambiarEdicionRadioVisual(val) {
    const btn1 = document.getElementById('btn-edicion-1');
    const btn2 = document.getElementById('btn-edicion-2');
    
    if (val === '1') {
        btn1.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btn1.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btn2.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btn2.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    } else {
        btn2.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btn2.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btn1.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btn1.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    }
}

function cambiarModoJuego(mode, playSound = true) {
    if (playSound) MagicAudio.playClick();
    gameMode = mode;

    const btnW = document.getElementById('btn-mode-writing');
    const btnEx = document.getElementById('btn-mode-examiner');

    if (mode === 'writing') {
        btnW.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btnW.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btnEx.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btnEx.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    } else {
        btnEx.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btnEx.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btnW.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btnW.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    }

    guardarPreferencias();
}

function actualizarMarcadorPuntos() {
    if (lblHousePointsTracker) {
        lblHousePointsTracker.innerHTML = `Puntos de Casa: <b class="text-yellow-400 font-bold">${housePoints}</b> ${streak >= 3 ? `<span class="text-amber-400 text-xs ml-1 font-mono">¡Racha x${streak}! 🔥</span>` : ''}`;
    }
}

// ==========================================
// ⚡ 8. PROCESADOR DE TEXTO INTELIGENTE Y ROBUSTO (Resuelve Bugs Críticos)
// ==========================================
async function cargarListaActual() {
    const listaNum = document.querySelector('input[name="lista"]:checked').value;
    const archivo = `resources/ListaPalabras_Ronda${listaNum}.txt`;
    
    try {
        btnIniciar.disabled = true;
        btnIniciar.innerText = "Cargando grimorio...";
        btnIniciar.classList.add('opacity-50', 'cursor-not-allowed');

        let texto = "";
        
        // Intentar fetch primero (Servidor web / Producción / Servidor Local)
        try {
            const respuesta = await fetch(archivo, { cache: 'no-store' });
            if (!respuesta.ok) throw new Error(`Archivo no encontrado: ${archivo}`);
            texto = await respuesta.text();
            console.log(`Cargado exitosamente desde red/servidor: ${archivo}`);
        } catch (fetchError) {
            console.warn(`Fetch falló para ${archivo}. Intentando cargar desde memoria local (CORS/file:// fallback)...`);
            // Fallback en caso de CORS o protocolo file://
            if (listaNum === '1') {
                texto = RONDA1_FALLBACK;
            } else {
                texto = RONDA2_FALLBACK;
            }
            if (!texto || texto.startsWith('__')) {
                throw new Error(`No hay datos de respaldo completos cargados en el cliente para la lista ${listaNum}`);
            }
            console.log(`Cargado exitosamente desde memoria interna (offline): ${archivo}`);
        }

        procesarTexto(texto);
        renderizarCheckboxes();
        
        listaCargadaNum = listaNum; 
        
        btnIniciar.disabled = false;
        btnIniciar.innerText = "¡Comenzar Práctica Mágica!";
        btnIniciar.classList.remove('opacity-50', 'cursor-not-allowed');
        
    } catch (error) {
        console.error('Error:', error);
        paginasContainer.innerHTML = `<p class="text-red-400 text-center col-span-full">⚠️ No se pudo abrir el pergamino de ${archivo}. Revisa la conexión o ubicación del archivo.</p>`;
        palabrasTodas = [];
        actualizarConteo();
        
        btnIniciar.innerText = "Error al abrir pergamino";
    }
}

function procesarTexto(texto) {
    palabrasTodas = [];
    const lineasRaw = texto.split('\n');
    const lineasProcesadas = [];
    
    // Soluciona el problema de saltos de línea dentro del campo de significado/descripción
    lineasRaw.forEach(linea => {
        const trimmed = linea.trim();
        if (!trimmed) return;
        
        // Detectar si la línea comienza una nueva palabra:
        // Formato 1: "1|word..."
        // Formato 2: "| 1 | word..."
        const isNewRecord = /^\d+\|/.test(trimmed) || /^\|\s*\d+\s*\|/.test(trimmed);
        
        if (isNewRecord) {
            lineasProcesadas.push(trimmed);
        } else {
            if (lineasProcesadas.length > 0) {
                // Acumula la descripción multilínea uniéndola con un espacio
                lineasProcesadas[lineasProcesadas.length - 1] += ' ' + trimmed;
            } else {
                lineasProcesadas.push(trimmed);
            }
        }
    });
    
    lineasProcesadas.forEach(linea => {
        let cleanLinea = linea;
        
        // Quita pipes externos iniciales/finales de tablas en markdown (ej. Ronda 2)
        if (cleanLinea.startsWith('|')) {
            cleanLinea = cleanLinea.substring(1);
        }
        if (cleanLinea.endsWith('|')) {
            cleanLinea = cleanLinea.substring(0, cleanLinea.length - 1);
        }
        
        const partes = cleanLinea.split('|').map(p => p.trim());
        if (partes.length < 2) return;
        
        const num = parseInt(partes[0]);
        if (isNaN(num)) return; // Salta encabezados de tabla o líneas inválidas
        
        let palabra = partes[1];
        let desc = '';
        let tipo = '';
        let pronunciacion = '';
        let significado = '';
        let dificultad = '';
        
        // Formato Ronda 1: num | palabra | desc
        if (partes.length === 2) {
            desc = '';
        } else if (partes.length === 3) {
            desc = partes[2];
        } 
        // Formato Ronda 2: num | word | type | pronunciation | meaning | dificulty
        else if (partes.length >= 5) {
            tipo = partes[2] || '';
            pronunciacion = partes[3] || '';
            significado = partes[4] || '';
            dificultad = partes[5] || '';
            
            // Ensamblar descripción formateada limpia y profesional
            let partsArray = [];
            if (tipo) partsArray.push(tipo);
            if (pronunciacion) partsArray.push(pronunciacion);
            if (significado) partsArray.push(significado);
            desc = partsArray.join(' ');
        }
        
        // Quitar comillas residuales alrededor de la descripción
        if (desc.startsWith('"') && desc.endsWith('"')) {
            desc = desc.substring(1, desc.length - 1);
        }
        
        const pag = Math.floor((num - 1) / PALABRAS_POR_PAGINA) + 1;
        
        palabrasTodas.push({ 
            num, 
            pag, 
            palabra, 
            desc, 
            tipo, 
            pronunciacion, 
            significado, 
            dificultad 
        });
    });
    
    palabrasTodas.sort((a, b) => a.num - b.num);
}

// ==========================================
// 🎛️ 9. RENDERIZACIÓN DE PAGINAS Y CONFIG (COMPATIBLE)
// ==========================================
function renderizarCheckboxes() {
    paginasContainer.innerHTML = '';
    if (palabrasTodas.length === 0) return;

    const maxPag = Math.max(...palabrasTodas.map(p => p.pag));
    
    for (let i = 1; i <= maxPag; i++) {
        const label = document.createElement('label');
        label.id = `label-check-pag-${i}`;
        label.className = "magic-checkbox-label cursor-pointer flex items-center space-x-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-800 hover:border-yellow-500/30 transition-colors";
        
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.className = "pagina-checkbox w-4 h-4 text-yellow-500 bg-slate-900 border-slate-700 rounded focus:ring-yellow-500";
        
        checkbox.addEventListener('change', (e) => {
            MagicAudio.playClick();
            if (e.target.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
            actualizarConteo();
        });
        
        const span = document.createElement('span');
        span.className = "text-sm sm:text-base font-magic text-slate-300 font-semibold";
        span.innerText = `Pág. ${i}`;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        paginasContainer.appendChild(label);
    }
    actualizarConteo();
}

function actualizarConteo() {
    let total = 0;
    
    if (activeFilterType === 'pages') {
        const seleccionadas = obtenerPaginasSeleccionadas();
        if (seleccionadas.length === 0) {
            total = palabrasTodas.length;
        } else {
            total = palabrasTodas.filter(p => seleccionadas.includes(p.pag)).length;
        }
    } else {
        // Filtrar por dificultad (Estricto - Solo muestra las seleccionadas)
        total = palabrasTodas.filter(p => {
            const diffClean = (p.dificultad || '').trim().toLowerCase();
            return selectedDifficulties.includes(diffClean);
        }).length;
    }
    conteoPalabras.innerText = `Palabras: ${total}`; 
}

function obtenerPaginasSeleccionadas() {
    const checks = document.querySelectorAll('.pagina-checkbox:checked');
    return Array.from(checks).map(cb => parseInt(cb.value));
}

function toggleAll() {
    const checks = document.querySelectorAll('.pagina-checkbox');
    if (checks.length === 0) return;
    
    const todosMarcados = Array.from(checks).every(cb => cb.checked);
    checks.forEach(cb => {
        cb.checked = !todosMarcados;
        const lbl = document.getElementById(`label-check-pag-${cb.value}`);
        if (lbl) {
            if (!todosMarcados) {
                lbl.classList.add('checked');
            } else {
                lbl.classList.remove('checked');
            }
        }
    });
    actualizarConteo();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// ==========================================
// ⚔️ 10. ARENA DE JUEGO MÁGICO (GAME LOOP)
// ==========================================
function iniciarJuego() {
    if (activeFilterType === 'pages') {
        const seleccionadas = obtenerPaginasSeleccionadas();
        if (seleccionadas.length > 0) {
            palabrasJuego = palabrasTodas.filter(p => seleccionadas.includes(p.pag));
        } else {
            palabrasJuego = [...palabrasTodas];
        }
    } else {
        // Filtro por dificultad (Estricto - Solo muestra las seleccionadas)
        palabrasJuego = palabrasTodas.filter(p => {
            const diffClean = (p.dificultad || '').trim().toLowerCase();
            return selectedDifficulties.includes(diffClean);
        });
    }

    if (palabrasJuego.length === 0) {
        alert("El Grimorio está vacío para la selección activa. Por favor, realiza otra selección.");
        return;
    }

    // Efecto de sonido de lanzamiento
    MagicAudio.playSpellCast();

    shuffle(palabrasJuego);
    correctas = [];
    incorrectas = [];
    indice = 0;
    
    // Resetear marcadores del juego
    streak = 0;
    actualizarMarcadorPuntos();

    viewConfig.classList.add('hidden');
    viewConfig.classList.remove('block');
    viewJuego.classList.remove('hidden');
    viewJuego.classList.add('block');

    // Configurar layout según Modo de Juego
    if (gameMode === 'writing') {
        controlsWriting.classList.remove('hidden');
        controlsExaminer.classList.add('hidden');
        wordHiddenDisplay.classList.remove('hidden');
        lblPalabra.classList.add('hidden');
        wordContainerBox.classList.add('hidden');
        btnRevealWord.classList.remove('hidden');
    } else {
        controlsWriting.classList.add('hidden');
        controlsExaminer.classList.remove('hidden');
        wordHiddenDisplay.classList.add('hidden');
        lblPalabra.classList.remove('hidden');
        wordContainerBox.classList.remove('hidden');
        btnRevealWord.classList.add('hidden');
    }

    mostrarSiguiente();
}

function mostrarSiguiente() {
    if (indice < palabrasJuego.length) {
        const p = palabrasJuego[indice];
        
        const edicionLabel = listaCargadaNum === '1' ? 'Primer Año: Fundamentos' : 'Segundo Año: Encantamientos';
        
        lblInfoLista.innerText = `${edicionLabel} · Pág. ${p.pag} · #${p.num}`;
        lblProgreso.innerText = `Progreso: ${indice + 1} de ${palabrasJuego.length}`;
        
        // Palabra principal
        lblPalabra.innerText = p.palabra;
        
        // Obtener dificultad de la palabra actual
        const diff = (p.dificultad || 'fácil').trim().toLowerCase();
        
        // Resetear clases de dificultad en el Badge, Contenedor y Palabra
        lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all bg-slate-950/80 border-slate-800 text-slate-400";
        wordContainerBox.className = "inline-block max-w-full break-words";
        
        // Ajuste inteligente de tamaño de tipografía según la longitud de la palabra para evitar desbordamiento horizontal en móviles
        const palabraLength = p.palabra.length;
        let responsiveFontSizeClass = "text-3xl sm:text-4xl md:text-5xl";
        if (palabraLength > 12) {
            responsiveFontSizeClass = "text-xl sm:text-2xl md:text-3xl";
        } else if (palabraLength > 8) {
            responsiveFontSizeClass = "text-2xl sm:text-3xl md:text-4xl";
        }
        lblPalabra.className = `magic-title ${responsiveFontSizeClass} font-black tracking-wide text-center uppercase select-none w-full text-white`;
        
        // Asignar colores: fácil (verde), medio (azul), difícil (morado)
        if (diff === 'medio') {
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-blue-500/30 bg-blue-500/10 text-blue-400";
            lblDificultadBadge.innerText = 'Medio';
        } else if (diff === 'difícil') {
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-purple-500/30 bg-purple-500/10 text-purple-400";
            lblDificultadBadge.innerText = 'Difícil';
        } else { // fácil
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-green-500/30 bg-green-500/10 text-green-400";
            lblDificultadBadge.innerText = 'Fácil';
        }
        
        // Fonética
        if (p.pronunciacion) {
            lblPhonetics.innerText = p.pronunciacion;
            lblPhonetics.classList.remove('hidden');
        } else if (p.desc.includes('//')) {
            // Extraer fonética si está embebida en la descripción en formato //sonido//
            const match = p.desc.match(/\/\/.*?\/\//);
            if (match) {
                lblPhonetics.innerText = match[0];
                lblPhonetics.classList.remove('hidden');
            } else {
                lblPhonetics.classList.add('hidden');
            }
        } else {
            lblPhonetics.classList.add('hidden');
        }

        // Limpiar descripción de dobles slashes y fonética duplicada
        let cleanDesc = p.desc || "(Encantamiento sin descripción en los archivos)";
        cleanDesc = cleanDesc.replace(/\/\/.*?\/\//g, '').trim();
        lblDesc.innerText = cleanDesc;
        
        // Progress bar
        const porcentajeW = (indice / palabrasJuego.length) * 100;
        progressBar.style.width = `${Math.max(porcentajeW, 3)}%`;

        // Si es modo escritura, resetear campos
        if (gameMode === 'writing') {
            txtSpellInput.value = '';
            txtSpellInput.disabled = false;
            txtSpellInput.className = "flex-1 bg-slate-950/80 border-2 border-slate-800 focus:border-yellow-500/60 rounded-xl px-4 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-slate-600 outline-none transition-all tracking-wide";
            
            document.getElementById('btn-cast-spell').style.display = 'flex';
            
            spellFeedback.classList.add('hidden');
            spellFeedback.className = "hidden text-center py-2 rounded-xl transition-all";
            
            wordHiddenDisplay.classList.remove('hidden');
            lblPalabra.classList.add('hidden');
            wordContainerBox.classList.add('hidden');
            btnRevealWord.classList.remove('hidden');
            
            txtSpellInput.focus();
        }

        // Pronunciar la palabra automáticamente después de una breve pausa
        setTimeout(() => {
            if (!viewJuego.classList.contains('hidden') && indice < palabrasJuego.length) {
                WizardTTS.speak(p.palabra);
            }
        }, 400);

    } else {
        mostrarResultados();
    }
}

// Revela manualmente el deletreo en modo de Escritura u oculto (cast Aparecium!)
function revelarPalabraManual() {
    MagicAudio.playSpellCast();
    lblPalabra.classList.remove('hidden');
    wordContainerBox.classList.remove('hidden');
    wordHiddenDisplay.classList.add('hidden');
    btnRevealWord.classList.add('hidden');
}

// ==========================================
// ✍️ 11. EVALUADOR INTERACTIVO DE ESCRITURA
// ==========================================
function evaluarEscrituraMagica() {
    if (indice >= palabrasJuego.length) return;
    
    const wordObj = palabrasJuego[indice];
    const userSpelling = txtSpellInput.value.trim().toLowerCase();
    const correctSpelling = wordObj.palabra.trim().toLowerCase();

    if (!userSpelling) {
        txtSpellInput.focus();
        return;
    }

    txtSpellInput.disabled = true;
    document.getElementById('btn-cast-spell').style.display = 'none';
    
    // Revelar la palabra correcta de fondo en el pergamino
    revelarPalabraManual();

    if (userSpelling === correctSpelling) {
        // Acierto!
        correctas.push(wordObj);
        
        // Sumar puntos e incremental por racha
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        const ptsGained = 10 + (Math.floor(streak / 3) * 5); // Combo bonus!
        housePoints += ptsGained;
        actualizarMarcadorPuntos();

        // Sonido y feedback visual
        MagicAudio.playSuccess();
        spellFeedback.className = "block bg-green-500/15 border border-green-500/30 text-green-400 py-3 px-4 rounded-xl text-sm font-semibold animate-pulse";
        spellFeedback.innerHTML = `✨ <b>¡Excelente conjuro!</b> Deletreado correctamente. <span class="text-white">+${ptsGained} Pts</span>`;
        spellFeedback.classList.remove('hidden');

        // Avanzar automáticamente después de 1.6 segundos
        setTimeout(() => {
            indice++;
            mostrarSiguiente();
        }, 1600);

    } else {
        // Error!
        incorrectas.push(wordObj);
        streak = 0;
        actualizarMarcadorPuntos();

        // Efecto vibración de error a la tarjeta
        gameCard.classList.add('shake-effect');
        setTimeout(() => gameCard.classList.remove('shake-effect'), 500);

        // Sonido y feedback visual
        MagicAudio.playError();
        txtSpellInput.className = "flex-1 bg-slate-950/80 border-2 border-red-500/60 rounded-xl px-4 py-3 sm:py-4 text-red-300 text-base sm:text-lg placeholder-slate-600 outline-none transition-all tracking-wide";
        
        spellFeedback.className = "block bg-red-500/15 border border-red-500/30 text-red-400 py-3 px-4 rounded-xl text-sm leading-relaxed";
        
        // Generar comparación letra por letra para feedback educativo premium
        const diffHTML = resaltarDiferenciasSpell(userSpelling, correctSpelling);
        spellFeedback.innerHTML = `⚠️ <b>Hechizo fallido...</b> Escribiste: <span class="line-through text-red-300">${diffHTML}</span><br>Pulsa el botón de abajo para seguir practicando.`;
        spellFeedback.classList.remove('hidden');

        // Mostrar un botón temporal de "Siguiente Hechizo" para darle control al estudiante
        const btnNext = document.createElement('button');
        btnNext.className = "w-full btn-magic mt-3 py-2 rounded-xl text-sm font-semibold uppercase tracking-wider text-slate-950 flex items-center justify-center gap-2";
        btnNext.innerHTML = "Continuar ➡️";
        btnNext.addEventListener('click', () => {
            MagicAudio.playClick();
            indice++;
            mostrarSiguiente();
        });
        spellFeedback.appendChild(btnNext);
    }
    
    guardarPreferencias();
}

// Resalta visualmente las diferencias para que el estudiante aprenda rápido
function resaltarDiferenciasSpell(escrita, correcta) {
    let result = '';
    const maxLen = Math.max(escrita.length, correcta.length);
    for (let i = 0; i < maxLen; i++) {
        const charEscrita = escrita[i] || '';
        const charCorrecta = correcta[i] || '';
        
        if (charEscrita === charCorrecta) {
            result += `<span class="text-slate-400">${charEscrita}</span>`;
        } else {
            result += `<span class="bg-red-900/60 text-red-200 border border-red-500/40 px-0.5 rounded font-black">${charEscrita || '•'}</span>`;
        }
    }
    return result;
}

// ==========================================
// 🎓 12. EVALUADOR MANUAL (MODO EXAMINADOR)
// ==========================================
function marcarCorrecto() {
    if (indice < palabrasJuego.length) {
        correctas.push(palabrasJuego[indice]);
        
        // Sumar puntos
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        const ptsGained = 10 + (Math.floor(streak / 3) * 5);
        housePoints += ptsGained;
        actualizarMarcadorPuntos();

        MagicAudio.playSuccess();
        indice++;
        mostrarSiguiente();
        guardarPreferencias();
    }
}

function marcarIncorrecto() {
    if (indice < palabrasJuego.length) {
        incorrectas.push(palabrasJuego[indice]);
        streak = 0;
        actualizarMarcadorPuntos();

        MagicAudio.playError();
        indice++;
        mostrarSiguiente();
        guardarPreferencias();
    }
}

// ==========================================
// 🏆 13. CEREMONIA DE RESULTADOS (COPA DE LAS CASAS)
// ==========================================
function mostrarResultados() {
    viewJuego.classList.add('hidden');
    viewJuego.classList.remove('block');
    viewResultados.classList.remove('hidden');
    viewResultados.classList.add('block');

    const total = correctas.length + incorrectas.length;
    const porcentaje = total === 0 ? 0 : (correctas.length / total) * 100;

    // Calcular puntos de casa ganados en esta sesión
    const puntosGanadosSesion = correctas.length * 10 + (maxStreak * 2);

    lblPorcentaje.innerText = `${porcentaje.toFixed(1)}%`;
    lblDetalleScore.innerText = `Aciertos: ${correctas.length} • Errores: ${incorrectas.length}`;
    lblHousePointsWon.innerText = `¡+${puntosGanadosSesion} Puntos ganados para la casa de ${HOUSE_NAMES_ES[selectedHouse]}!`;

    // Asignar colores de porcentaje dinámicos
    lblPorcentaje.className = "text-4xl sm:text-5xl font-black " + 
        (porcentaje >= 80 ? "text-green-400" : (porcentaje >= 50 ? "text-amber-400" : "text-red-400"));

    // Rango de calificacion del mago
    let rangoMago = '';
    
    if (porcentaje === 100) {
        rangoMago = 'Mago Supremo (Orden de Merlín)';
    } else if (porcentaje >= 85) {
        rangoMago = 'Prefecto de Hogwarts';
    } else if (porcentaje >= 65) {
        rangoMago = 'Estudiante Aventajado';
    } else if (porcentaje >= 40) {
        rangoMago = 'Aprendiz de Pociones';
    } else if (porcentaje > 0) {
        rangoMago = 'Muggle en Entrenamiento';
    } else {
        rangoMago = 'Squib Confundido';
    }

    lblRangoMago.innerText = rangoMago;
    resultsCrest.src = HOUSE_CRESTS[selectedHouse];

    // Tocar sonido ceremonioso
    if (porcentaje >= 75) {
        MagicAudio.playSuccess();
        setTimeout(() => MagicAudio.playSpellCast(), 400);
    } else {
        MagicAudio.playError();
    }

    // Renderizar la tabla de refuerzo si hay errores
    if (incorrectas.length > 0) {
        refuerzoContainer.classList.remove('hidden');
        tablaRefuerzo.innerHTML = '';
        
        const edicionLabel = listaCargadaNum === '1' ? 'Primer Año' : 'Segundo Año';

        incorrectas.sort((a, b) => a.num - b.num).forEach(p => {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-900/60 transition-colors text-xs sm:text-sm text-slate-300";
            
            // Botón de reproducción de audio individual
            const btnSpeakCell = document.createElement('button');
            btnSpeakCell.className = "w-8 h-8 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/20 transition-all text-xs";
            btnSpeakCell.innerHTML = "🔊";
            btnSpeakCell.addEventListener('click', () => WizardTTS.speak(p.palabra));

            // Crear columnas estructuradas
            const tdEd = document.createElement('td');
            tdEd.className = "py-4 px-4 text-center border-t border-slate-800 font-magic";
            tdEd.innerText = edicionLabel;

            const tdPag = document.createElement('td');
            tdPag.className = "py-4 px-4 text-center border-t border-slate-800";
            tdPag.innerText = `Pág. ${p.pag}`;

            const tdNum = document.createElement('td');
            tdNum.className = "py-4 px-4 text-center border-t border-slate-800 font-mono";
            tdNum.innerText = `#${p.num}`;

            const tdWord = document.createElement('td');
            tdWord.className = "py-4 px-4 border-t border-slate-800 font-bold text-center text-yellow-400";
            tdWord.innerText = p.palabra;

            const tdAudio = document.createElement('td');
            tdAudio.className = "py-4 px-4 border-t border-slate-800 flex justify-center items-center";
            tdAudio.appendChild(btnSpeakCell);

            tr.appendChild(tdEd);
            tr.appendChild(tdPag);
            tr.appendChild(tdNum);
            tr.appendChild(tdWord);
            tr.appendChild(tdAudio);

            tablaRefuerzo.appendChild(tr);
        });
    } else {
        refuerzoContainer.classList.add('hidden');
    }
}

function reiniciar() {
    MagicAudio.playClick();
    viewResultados.classList.add('hidden');
    viewResultados.classList.remove('block');
    viewConfig.classList.remove('hidden');
    viewConfig.classList.add('block');
    
    progressBar.style.width = '0%';
    
    cargarListaActual();
}

// ==========================================
// 📖 14. BIBLIOTECA / EXPLORADOR DE PALABRAS (GRIMORIO)
// ==========================================
async function abrirBiblioteca() {
    MagicAudio.playSpellCast();
    modalBiblioteca.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    
    libActiveListNum = document.querySelector('input[name="lista"]:checked')?.value || '1';
    await cargarDatosBiblioteca();
}

function cerrarBiblioteca() {
    MagicAudio.playClick();
    modalBiblioteca.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Habilitar scroll
}

async function cambiarLibEdicion(num) {
    MagicAudio.playClick();
    libActiveListNum = num;
    
    // Toggle clases visuales de botones
    const btn1 = document.getElementById('btn-lib-ed-1');
    const btn2 = document.getElementById('btn-lib-ed-2');
    if (num === '1') {
        btn1.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-400";
        btn2.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border border-slate-800 bg-slate-950 text-slate-400";
    } else {
        btn2.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-400";
        btn1.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border border-slate-800 bg-slate-950 text-slate-400";
    }
    
    await cargarDatosBiblioteca();
}

async function cargarDatosBiblioteca() {
    const archivo = `resources/ListaPalabras_Ronda${libActiveListNum}.txt`;
    libWordList.innerHTML = `<p class="text-slate-500 text-center col-span-full animate-pulse my-10">Desenrollando pergamino de palabras...</p>`;
    
    try {
        let texto = "";
        try {
            const respuesta = await fetch(archivo, { cache: 'no-store' });
            if (!respuesta.ok) throw new Error(`Archivo no encontrado: ${archivo}`);
            texto = await respuesta.text();
        } catch (fetchError) {
            console.warn("Fetch de biblioteca fallido, usando respaldo incrustado.");
            if (libActiveListNum === '1') {
                texto = RONDA1_FALLBACK;
            } else {
                texto = RONDA2_FALLBACK;
            }
        }
        
        // Procesar temporalmente para la biblioteca
        procesarTextoBiblioteca(texto);
        renderizarBibliotecaPalabras();
    } catch (e) {
        console.error('Error cargando biblioteca:', e);
        libWordList.innerHTML = `<p class="text-red-400 text-center col-span-full py-10">⚠️ Error al consultar el grimorio en ${archivo}.</p>`;
    }
}

function procesarTextoBiblioteca(texto) {
    libPalabrasCached = [];
    const lineasRaw = texto.split('\n');
    const lineasProcesadas = [];
    
    lineasRaw.forEach(linea => {
        const trimmed = linea.trim();
        if (!trimmed) return;
        const isNewRecord = /^\d+\|/.test(trimmed) || /^\|\s*\d+\s*\|/.test(trimmed);
        if (isNewRecord) {
            lineasProcesadas.push(trimmed);
        } else {
            if (lineasProcesadas.length > 0) {
                lineasProcesadas[lineasProcesadas.length - 1] += ' ' + trimmed;
            } else {
                lineasProcesadas.push(trimmed);
            }
        }
    });
    
    lineasProcesadas.forEach(linea => {
        let cleanLinea = linea;
        if (cleanLinea.startsWith('|')) cleanLinea = cleanLinea.substring(1);
        if (cleanLinea.endsWith('|')) cleanLinea = cleanLinea.substring(0, cleanLinea.length - 1);
        
        const partes = cleanLinea.split('|').map(p => p.trim());
        if (partes.length < 2) return;
        
        const num = parseInt(partes[0]);
        if (isNaN(num)) return;
        
        let palabra = partes[1];
        let desc = '';
        let tipo = '';
        let pronunciacion = '';
        
        if (partes.length === 2) {
            desc = '';
        } else if (partes.length === 3) {
            desc = partes[2];
        } else if (partes.length >= 5) {
            tipo = partes[2] || '';
            pronunciacion = partes[3] || '';
            const significado = partes[4] || '';
            const dif = partes[5] || '';
            
            let partsArray = [];
            if (tipo) partsArray.push(tipo);
            if (pronunciacion) partsArray.push(pronunciacion);
            if (significado) partsArray.push(significado);
            desc = partsArray.join(' ');
        }
        
        if (desc.startsWith('"') && desc.endsWith('"')) {
            desc = desc.substring(1, desc.length - 1);
        }
        
        const pag = Math.floor((num - 1) / PALABRAS_POR_PAGINA) + 1;
        
        libPalabrasCached.push({ num, pag, palabra, desc, tipo, pronunciacion });
    });
    libPalabrasCached.sort((a, b) => a.num - b.num);
}

function renderizarBibliotecaPalabras() {
    libWordList.innerHTML = '';
    
    const query = txtLibSearch.value.trim().toLowerCase();
    const filtradas = libPalabrasCached.filter(p => {
        return p.palabra.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    });
    
    if (filtradas.length === 0) {
        libWordList.innerHTML = `<p class="text-slate-500 text-center col-span-full py-12">Ninguna palabra mágica coincide con tu búsqueda.</p>`;
        return;
    }
    
    filtradas.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl hover:border-yellow-500/20 transition-all flex items-start justify-between gap-3 text-left relative overflow-hidden group";
        
        // Limpieza de descripción para el listado de biblioteca
        let cleanDesc = p.desc || "(Sin descripción)";
        cleanDesc = cleanDesc.replace(/\/\/.*?\/\//g, '').trim();

        // Extraer fonética si existe
        let foneticaStr = '';
        if (p.pronunciacion) {
            foneticaStr = p.pronunciacion;
        } else {
            const match = p.desc.match(/\/\/.*?\/\//);
            if (match) foneticaStr = match[0];
        }

        const infoDiv = document.createElement('div');
        infoDiv.className = "flex-1 space-y-1";
        infoDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-xs font-semibold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono">Pág. ${p.pag}</span>
                <span class="text-xs font-mono text-yellow-500/60 font-semibold">#${p.num}</span>
            </div>
            <h4 class="font-magic text-base font-bold text-yellow-400 uppercase tracking-wide group-hover:text-white transition-colors">${p.palabra}</h4>
            ${foneticaStr ? `<p class="text-xs font-mono text-slate-500">${foneticaStr}</p>` : ''}
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-light line-clamp-2" title="${cleanDesc}">${cleanDesc}</p>
        `;

        const btnSpeak = document.createElement('button');
        btnSpeak.className = "w-10 h-10 rounded-full bg-yellow-500/5 hover:bg-yellow-500/15 text-yellow-500 border border-yellow-500/20 hover:border-yellow-400 flex items-center justify-center text-sm transition-all flex-shrink-0 group-hover:scale-105 self-center";
        btnSpeak.innerHTML = "🔊";
        btnSpeak.addEventListener('click', () => {
            MagicAudio.playClick();
            WizardTTS.speak(p.palabra);
        });

        card.appendChild(infoDiv);
        card.appendChild(btnSpeak);
        libWordList.appendChild(card);
    });
}

// ==========================================
// 🛠️ 15. SELECCIÓN DE FILTRO: PÁGINAS O DIFICULTAD
// ==========================================
function setFilterType(type) {
    MagicAudio.playClick();
    activeFilterType = type;
    
    const btnPages = document.getElementById('btn-filter-type-pages');
    const btnDiff = document.getElementById('btn-filter-type-difficulty');
    const pagContainer = document.getElementById('paginas-container');
    const diffContainer = document.getElementById('difficulty-container');
    const btnToggleAll = document.getElementById('btn-toggle-all');
    const pagSublabel = document.getElementById('pag-sublabel');

    if (type === 'pages') {
        btnPages.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        btnDiff.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all text-slate-400";
        
        pagContainer.classList.remove('hidden');
        diffContainer.classList.add('hidden');
        btnToggleAll.classList.remove('hidden');
        pagSublabel.innerText = "Selecciona páginas específicas o practica el libro completo.";
    } else {
        btnDiff.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        btnPages.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all text-slate-400";
        
        pagContainer.classList.add('hidden');
        diffContainer.classList.remove('hidden');
        btnToggleAll.classList.add('hidden');
        pagSublabel.innerText = "Selecciona una o más dificultades para iniciar tu práctica.";
        
        if (selectedDifficulties.length === 0) {
            toggleDifficultyFilter('fácil', false); // Selecciona facil por defecto
        }
    }
    actualizarConteo();
}

window.toggleDifficultyFilter = function(diff, playSound = true) {
    if (playSound) MagicAudio.playClick();

    const index = selectedDifficulties.indexOf(diff);
    if (index > -1) {
        selectedDifficulties.splice(index, 1);
    } else {
        selectedDifficulties.push(diff);
    }

    // Actualizar clases visuales de los botones de dificultad
    const diffCards = {
        'fácil': { btn: document.getElementById('btn-diff-facil'), colorClass: 'border-green-500/40 bg-green-500/5 text-green-400', emoji: '🟢' },
        'medio': { btn: document.getElementById('btn-diff-medio'), colorClass: 'border-blue-500/40 bg-blue-500/5 text-blue-400', emoji: '🔵' },
        'difícil': { btn: document.getElementById('btn-diff-dificil'), colorClass: 'border-purple-500/40 bg-purple-500/5 text-purple-400', emoji: '🟣' }
    };

    Object.keys(diffCards).forEach(key => {
        const item = diffCards[key];
        if (selectedDifficulties.includes(key)) {
            item.btn.className = `diff-card magic-card p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 ${item.colorClass} transition-all hover:scale-105`;
            item.btn.querySelector('h4').className = `font-magic text-sm sm:text-base font-bold text-white`;
        } else {
            item.btn.className = `diff-card magic-card p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-slate-800 bg-slate-950/40 transition-all hover:scale-105`;
            item.btn.querySelector('h4').className = `font-magic text-sm sm:text-base font-bold text-slate-300`;
        }
    });

    actualizarConteo();
};