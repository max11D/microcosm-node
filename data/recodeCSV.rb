require 'csv'
require 'json'

f = File.read("./restaurants.csv", encoding: "UTF-8")
puts f.encoding
f.gsub!("\xEF\xBB\xBF", "") # strip BOM

csv = CSV.parse(f, headers: true)

cuisines = []

diets = []

types = []

csv.each_with_index do |row, i|
    #puts row
    #puts row if i == 0;


    e = row["Ethnicity"]
    cuisines << e unless cuisines.include?(e) || e.nil?

    d = row["Dietary Restrictions"].to_s

    d.split(',').each do |d|
        diets << d unless diets.include?(d) || d.nil?
    end

    t = row["Establishment Type"].to_s
    t.split(',').each do |t|
        types << t unless types.include?(t)
    end
end

cuisines.sort!
diets.sort!
types.sort!

puts cuisines.inspect, diets.inspect, types.inspect

f = File.open("./restaurants_recoded.csv", "w+")

f << csv.headers.join(",") << "\n"

csv.each_with_index do |row, i| 
    row["Ethnicity"] = cuisines.index(row["Ethnicity"]).to_s

    d = row["Dietary Restrictions"].to_s.split(",").map { |x| diets.index(x) }
    row["Dietary Restrictions"] = d.join(";")

    d = row["Establishment Type"].to_s.split(",").map { |x| types.index(x) }
    row["Establishment Type"] = d.join(";")

    f << row.to_s
end

f.close

f = File.open("restaurants_codes.json", "w+")

f << {
    cuisines: cuisines,
    diets: diets,
    establishment_types: types
}.to_json

f.close

