package main

import (
	"io"
	"os"

	"gopkg.in/yaml.v2"
)

type Repository struct {
	Name        []string `yaml:",flow"`
	Origin      []string `yaml:",flow"`
	Mode        string   `yaml:"mode"`
	Destination string   `yaml:"destination"`
}

type Config struct {
	Repo       Repository `yaml:"repository"`
	OutputMode string     `yaml:"output"`
	Language   string     `yaml:"lang_mode"`
}

const filename string = "config.yaml"

func NewConfig() Config {

	file, err := os.Open(filename)
	if err != nil {
		return Default()
	}
	defer file.Close()

	config := Config{}

	content, err := io.ReadAll(file)
	if err != nil {
		return Default()
	}

	err = yaml.Unmarshal([]byte(content), &config)
	if err != nil {
		return Default()
	}

	return config
}

func Default() Config {
	return Config{
		Repo: Repository{
			Name:        []string{"lotus", "spec-actors"},
			Origin:      []string{"https://github.com/filecoin-project/lotus/", "https://github.com/filecoin-project/specs-actors/"},
			Mode:        "local",
			Destination: "_local",
		},
		OutputMode: "stdout",
		Language:   "auto",
	}
}
