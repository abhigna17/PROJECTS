import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.net.URI;

public class MainFrame extends JFrame {
    private String currentUser ;
    private JPanel mainPanel;
    private CardLayout cardLayout;

    public MainFrame(String username) {
        this.currentUser  = username;
        setTitle("Coding Platform");
        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        // Create menu bar
        JMenuBar menuBar = new JMenuBar();
        JMenu menu = new JMenu("Navigation");
        
        String[] menuItems = {"Home", "Courses", "Quiz", "Profile"};
        for (String item : menuItems) {
            JMenuItem menuItem = new JMenuItem(item);
            menuItem.addActionListener(e -> {
                if (item.equals("Quiz")) {
                    openQuizletGUI(); // Navigate to Quizlet GUI
                } else {
                    showCard(item.toLowerCase());
                }
            });
            menu.add(menuItem);
        }

        JMenuItem signOut = new JMenuItem("Sign Out");
        signOut.addActionListener(e -> {
            new LoginFrame().setVisible(true);
            dispose();
        });
        menu.add(signOut);
        
        menuBar.add(menu);
        setJMenuBar(menuBar);

        // Main content panel with CardLayout
        cardLayout = new CardLayout();
        mainPanel = new JPanel(cardLayout);

        // Add different sections
        mainPanel.add(createHomePanel(), "home");
        mainPanel.add(createCoursesPanel(), "courses");
        mainPanel.add(createProfilePanel(), "profile");

        add(mainPanel);
        showCard("home");
    }

    private void openQuizletGUI() {
        // Create and show the Quizlet GUI
        SwingUtilities.invokeLater(() -> {
            new QuizletGUI().setVisible(true);
            dispose(); // Close the current MainFrame
        });
    }

    private JPanel createHomePanel() {
        JPanel panel = new JPanel(new GridLayout(3, 1, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        String[] platforms = {"CodeChef", "GeeksforGeeks", "LeetCode"};
        for (String platform : platforms) {
            JButton button = new JButton(platform);
            button.addActionListener(e -> {
                try {
                    Desktop.getDesktop().browse(new URI("https://www." + platform.toLowerCase() + ".com"));
                } catch (Exception ex) {
                    JOptionPane.showMessageDialog(this, "Error opening website!");
                }
            });
            panel.add(button);
        }

        return panel;
    }

    private JPanel createCoursesPanel() {
        JPanel panel = new JPanel(new BorderLayout());
        String[] courses = {"Computer Science", "Electronics", "Mechanical", "Civil"};
        JComboBox<String> courseCombo = new JComboBox<>(courses);
        
        JTextArea subjectsArea = new JTextArea();
        subjectsArea.setEditable(false);

        courseCombo.addActionListener(e -> {
            String selected = (String)courseCombo.getSelectedItem();
            String subjects = "";
            switch(selected) {
                case "Computer Science":
                    subjects = "• Data Structures\n• Algorithms\n• Database Management\n• Operating Systems";
                    break;
                case "Electronics":
                    subjects = "• Digital Electronics\n• Analog Circuits\n• Microprocessors\n• Communication Systems";
                    break;
                case "Mechanical":
                    subjects = "• Thermodynamics\n• Fluid Mechanics\n• Machine Design\n• Manufacturing Processes";
                    break;
                case "Civil":
                    subjects = "• Structural Engineering\n• Geotechnical Engineering\n• Transportation Engineering\n• Environmental Engineering";
                    break;
            }
            subjectsArea.setText(subjects);
        });

        panel.add(courseCombo, BorderLayout.NORTH);
        panel.add(new JScrollPane(subjectsArea), BorderLayout.CENTER);
        return panel;
    }

    private JPanel createProfilePanel() {
        JPanel panel = new JPanel(new GridLayout(6, 2, 10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));

        UserProfile profile = Database.getProfile(currentUser );

        JTextField fullNameField = new JTextField(profile.getFullName());
        JTextField emailField = new JTextField(profile.getEmail());
        JTextField collegeField = new JTextField(profile.getCollege());
        JPasswordField newPasswordField = new JPasswordField();

        panel.add(new JLabel("Username:"));
        panel.add(new JLabel(currentUser ));
        panel.add(new JLabel("Full Name:"));
        panel.add(fullNameField);
        panel.add(new JLabel("Email:"));
        panel.add(emailField);
        panel.add(new JLabel("College:"));
        panel.add(collegeField);
        panel.add(new JLabel("New Password:"));
        panel.add(newPasswordField);

        JButton updateButton = new JButton("Update Profile");
        updateButton.addActionListener(e -> {
            profile.setFullName(fullNameField.getText());
            profile.setEmail(emailField.getText());
            profile.setCollege(collegeField.getText());
            
            String newPassword = new String(newPasswordField.getPassword());
            if (!newPassword.isEmpty()) {
                Database.updatePassword(currentUser , newPassword);
            }
            
            Database.updateProfile(profile);
            JOptionPane.showMessageDialog(this, "Profile updated successfully!");
        });

        panel.add(updateButton);
        return panel;
    }

    private void showCard(String cardName) {
        cardLayout.show(mainPanel, cardName);
    }
}