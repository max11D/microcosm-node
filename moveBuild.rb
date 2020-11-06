#!/usr/bin/env ruby

require 'fileutils'

FN_BUILT_INDEX = "./build/index.html"
CSS_REGEX = /main\.[a-z0-9]{8}\.chunk\.css/

built_index = File.open(FN_BUILT_INDEX).read;

css_file_name = built_index.match(CSS_REGEX)[0]

puts css_file_name

FN_FIND_SOME_FOOD = "../microcosm/find-some-food.html";
FN_RESTAURANT_SEARCH = "../microcosm/restaurants/search.html"
FN_RESTAURANT_VIEW = "../microcosm/restaurants/view.html"

[FN_FIND_SOME_FOOD, FN_RESTAURANT_SEARCH, FN_RESTAURANT_VIEW].each do |f|
    File.delete(f) if File.exists?(f)
    FileUtils.cp(FN_BUILT_INDEX, f)
end

FN_INDEX = "../microcosm/index.html"

index = File.open(FN_INDEX).read.gsub(CSS_REGEX, css_file_name)

File.open(FN_INDEX, "w+") do |file|
    file << index
end

["data", "images", "static"].each do |p|
    FileUtils.rm_r("../microcosm/#{p}") if Dir.exists?("../microcosm/#{p}")
    FileUtils.mv("./build/#{p}", "../microcosm/#{p}")
end