import javax.swing.*;
import java.awt.*;
import java.util.*;
import java.util.List;

class Flashcard {
    private String question;
    private String answer;
    private boolean isLearned;

    public Flashcard(String question, String answer) {
        this.question = question;
        this.answer = answer;
        this.isLearned = false;
    }

    public String getQuestion() { return question; }
    public String getAnswer() { return answer; }
    public boolean isLearned() { return isLearned; }
    public void setLearned(boolean learned) { isLearned = learned; }
}

class FlashcardDeck {
    private String name;
    private List<Flashcard> cards;

    public FlashcardDeck(String name) {
        this.name = name;
        this.cards = new ArrayList<>();
    }

    public String getName() { return name; }
    public List<Flashcard> getCards() { return cards; }
    public void addCard(Flashcard card) { cards.add(card); }
}

public class QuizletGUI extends JFrame {
    private List<FlashcardDeck> decks;
    private JPanel mainPanel;
    private CardLayout cardLayout;
    private FlashcardDeck currentDeck;
    private int currentCardIndex;

    public QuizletGUI() {
        decks = new ArrayList<>();
        setupGUI();
    }

    private void setupGUI() {
        setTitle("Quizlet Clone");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 600);
        setLocationRelativeTo(null);

        cardLayout = new CardLayout();
        mainPanel = new JPanel(cardLayout);

        // Create different panels
        mainPanel.add(createHomePanel(), "HOME");
        mainPanel.add(createCreateDeckPanel(), "CREATE_DECK");
        mainPanel.add(createStudyPanel(), "STUDY");

        add(mainPanel);
    }

    private JPanel createHomePanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(new Color(240, 240, 250));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Title
        JLabel titleLabel = new JLabel("Quizlet Clone", SwingConstants.CENTER);
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        panel.add(titleLabel, BorderLayout.NORTH);

        // Buttons Panel
        JPanel buttonsPanel = new JPanel(new GridBagLayout());
        buttonsPanel.setOpaque(false);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 0, 5, 0);

        JButton createDeckBtn = createStyledButton("Create New Deck");
        JButton studyBtn = createStyledButton("Study Deck");
        
        createDeckBtn.addActionListener(e -> cardLayout.show(mainPanel, "CREATE_DECK"));
        studyBtn.addActionListener(e -> {
            if (decks.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Please create a deck first!");
            } else {
                showDeckSelectionDialog();
            }
        });

        buttonsPanel.add(createDeckBtn, gbc);
        buttonsPanel.add(studyBtn, gbc);

        panel.add(buttonsPanel, BorderLayout.CENTER);
        return panel;
    }

    private JButton createStyledButton(String text) {
        JButton button = new JButton(text);
        button.setFont(new Font("Arial", Font.PLAIN, 16));
        button.setPreferredSize(new Dimension(200, 40));
        button.setBackground(new Color(70, 130, 180));
        button.setForeground(Color.WHITE);
        button.setFocusPainted(false);
        button.setBorderPainted(false);
        return button;
    }

    private JPanel createCreateDeckPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(new Color(240, 240, 250));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        // Form Panel
        JPanel formPanel = new JPanel(new GridBagLayout());
        formPanel.setOpaque(false);
        GridBagConstraints gbc = new GridBagConstraints();
        gbc.gridwidth = GridBagConstraints.REMAINDER;
        gbc.fill = GridBagConstraints.HORIZONTAL;
        gbc.insets = new Insets(5, 0, 5, 0);

        JTextField deckNameField = new JTextField(20);
        deckNameField.setPreferredSize(new Dimension(200, 30));
        
        JTextField questionField = new JTextField(20);
        JTextField answerField = new JTextField(20);

        formPanel.add(new JLabel("Deck Name:"), gbc);
        formPanel.add(deckNameField, gbc);
        formPanel.add(Box.createVerticalStrut(20), gbc);
        formPanel.add(new JLabel("Question:"), gbc);
        formPanel.add(questionField, gbc);
        formPanel.add(new JLabel("Answer:"), gbc);
        formPanel.add(answerField, gbc);

        JButton addCardBtn = createStyledButton("Add Card");
        JButton finishBtn = createStyledButton("Finish Deck");
        JButton backBtn = createStyledButton("Back to Home");

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        buttonPanel.setOpaque(false);
        buttonPanel.add(addCardBtn);
        buttonPanel.add(finishBtn);
        buttonPanel.add(backBtn);

        ArrayList<Flashcard> tempCards = new ArrayList<>();

        addCardBtn.addActionListener(e -> {
            if (questionField.getText().isEmpty() || answerField.getText().isEmpty()) {
                JOptionPane.showMessageDialog(this, "Please fill both question and answer fields!");
                return;
            }
            tempCards.add(new Flashcard(questionField.getText(), answerField.getText()));
            questionField.setText("");
            answerField.setText("");
            JOptionPane.showMessageDialog(this, "Card added successfully!");
        });

        finishBtn.addActionListener(e -> {
            if (deckNameField.getText().isEmpty()) {
                JOptionPane.showMessageDialog(this, "Please enter a deck name!");
                return;
            }
            if (tempCards.isEmpty()) {
                JOptionPane.showMessageDialog(this, "Please add at least one card!");
                return;
            }
            FlashcardDeck deck = new FlashcardDeck(deckNameField.getText());
            tempCards.forEach(deck::addCard);
            decks.add(deck);
            deckNameField.setText("");
            tempCards.clear();
            JOptionPane.showMessageDialog(this, "Deck created successfully!");
            cardLayout.show(mainPanel, "HOME");
        });

        backBtn.addActionListener(e -> cardLayout.show(mainPanel, "HOME"));

        panel.add(formPanel, BorderLayout.CENTER);
        panel.add(buttonPanel, BorderLayout.SOUTH);

        return panel;
    }

    private JPanel createStudyPanel() {
        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBackground(new Color(240, 240, 250));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        JPanel cardPanel = new JPanel(new BorderLayout(10, 10));
        cardPanel.setBackground(Color.WHITE);
        cardPanel.setBorder(BorderFactory.createLineBorder(Color.GRAY));

        JLabel contentLabel = new JLabel("", SwingConstants.CENTER);
        contentLabel.setFont(new Font("Arial", Font.BOLD, 20));
        cardPanel.add(contentLabel, BorderLayout.CENTER);

        JButton flipBtn = createStyledButton("Flip Card");
        JButton nextBtn = createStyledButton("Next Card");
        JButton backBtn = createStyledButton("Back to Home");

        JPanel buttonPanel = new JPanel(new FlowLayout(FlowLayout.CENTER, 10, 10));
        buttonPanel.setOpaque(false);
        buttonPanel.add(flipBtn);
        buttonPanel.add(nextBtn);
        buttonPanel.add(backBtn);

        final boolean[] showingQuestion = {true};

        flipBtn.addActionListener(e -> {
            if (currentDeck != null && !currentDeck.getCards().isEmpty()) {
                Flashcard card = currentDeck.getCards().get(currentCardIndex);
                if (showingQuestion[0]) {
                    contentLabel.setText(card.getAnswer());
                } else {
                    contentLabel.setText(card.getQuestion());
                }
                showingQuestion[0] = !showingQuestion[0];
            }
        });

        nextBtn.addActionListener(e -> {
            if (currentDeck != null && !currentDeck.getCards().isEmpty()) {
                currentCardIndex = (currentCardIndex + 1) % currentDeck.getCards().size();
                contentLabel.setText(currentDeck.getCards().get(currentCardIndex).getQuestion());
                showingQuestion[0] = true;
            }
        });

        backBtn.addActionListener(e -> {
            cardLayout.show(mainPanel, "HOME");
            contentLabel.setText("");
        });

        panel.add(cardPanel, BorderLayout.CENTER);
        panel.add(buttonPanel, BorderLayout.SOUTH);

        return panel;
    }

    private void showDeckSelectionDialog() {
        String[] deckNames = decks.stream().map(FlashcardDeck::getName).toArray(String[]::new);
        String selectedDeck = (String) JOptionPane.showInputDialog(
            this,
            "Choose a deck to study:",
            "Select Deck",
            JOptionPane.QUESTION_MESSAGE,
            null,
            deckNames,
            deckNames[0]
        );

        if (selectedDeck != null) {
            currentDeck = decks.stream()
                .filter(d -> d.getName().equals(selectedDeck))
                .findFirst()
                .orElse(null);
            
            if (currentDeck != null && !currentDeck.getCards().isEmpty()) {
                currentCardIndex = 0;
                JPanel studyPanel = (JPanel) mainPanel.getComponent(2);
                JPanel cardPanel = (JPanel) studyPanel.getComponent(0);
                JLabel contentLabel = (JLabel) cardPanel.getComponent(0);
                contentLabel.setText(currentDeck.getCards().get(0).getQuestion());
                cardLayout.show(mainPanel, "STUDY");
            }
        }
    }

    public static void main(String[] args) {
        try {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        SwingUtilities.invokeLater(() -> {
            new QuizletGUI().setVisible(true);
        });
    }
}
